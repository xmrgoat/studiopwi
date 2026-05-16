#!/usr/bin/env python3
"""Deploy StudioPWI (Next.js app) to the VPS, replacing the old static site.

Steps:
  1. Pack tarball from .next/standalone + .next/static + public/
  2. Remove old /var/www/studiopwi static site + its nginx vhost
  3. Preserve .env and SQLite DB from existing /opt/studiopwi if present
  4. Extract and assemble new build at /opt/studiopwi
  5. Restore .env and DB
  6. Write nginx reverse-proxy vhost for studiopwi.com
  7. Start / restart via pm2
  8. Run certbot (graceful if DNS not pointed yet)

Before running:
  npm run build           # needs output: standalone in next.config.ts
  python vps/vps/deploy_studiopwi.py
"""
import sys, os, io, tarfile, paramiko

os.environ.setdefault("PYTHONIOENCODING", "utf-8")
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

HOST       = "185.142.53.199"
USER       = "root"
PASS       = "*I-1LI9QX=nq"
DOMAIN     = "studiopwi.com"
WWW_DOMAIN = "www.studiopwi.com"
REMOTE_DIR = "/opt/studiopwi"
PORT       = 3002
PM2_NAME   = "studiopwi"

# Old static-site paths to remove
OLD_STATIC_DIR  = "/var/www/studiopwi"
OLD_NGINX_AVAIL = f"/etc/nginx/sites-available/{DOMAIN}"
OLD_NGINX_ENABL = f"/etc/nginx/sites-enabled/{DOMAIN}"

# Project paths (script lives at <project>/vps/vps/deploy_studiopwi.py)
HERE         = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(HERE))   # two levels up → project root
NEXT_DIR     = os.path.join(PROJECT_ROOT, ".next")
PUBLIC_DIR   = os.path.join(PROJECT_ROOT, "public")

NGINX_VHOST = f"""# {DOMAIN} — managed by deploy_studiopwi.py (certbot will add HTTPS block)
server {{
    listen 80;
    listen [::]:80;
    server_name {DOMAIN} {WWW_DOMAIN};

    client_max_body_size 50M;

    # Serve Next.js static chunks with long-lived cache
    location /_next/static/ {{
        alias {REMOTE_DIR}/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }}

    # Serve public/ assets directly
    location /images/ {{
        alias {REMOTE_DIR}/public/images/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }}

    location /videos/ {{
        alias {REMOTE_DIR}/public/videos/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }}

    location / {{
        proxy_pass         http://127.0.0.1:{PORT};
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }}
}}
"""

ECOSYSTEM = f"""module.exports = {{
  apps: [{{
    name: '{PM2_NAME}',
    script: '{REMOTE_DIR}/server.js',
    cwd: '{REMOTE_DIR}',
    env: {{
      NODE_ENV: 'production',
      PORT: {PORT},
      HOSTNAME: '0.0.0.0',
    }},
    instances: 1,
    autorestart: true,
    max_memory_restart: '512M',
  }}],
}};
"""


def run(c, cmd, timeout=120, label=None, allow_fail=False):
    if label:
        print(f"\n=== {label} ===")
    print(f"  > {cmd}")
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode(errors="replace").rstrip()
    e = err.read().decode(errors="replace").rstrip()
    code = out.channel.recv_exit_status()
    if o:
        print(o)
    if e:
        print(f"[stderr] {e}", file=sys.stderr)
    if code != 0 and not allow_fail:
        raise RuntimeError(f"Command failed (exit {code}): {cmd}")
    return code


def make_tarball():
    standalone_dir = os.path.join(NEXT_DIR, "standalone")
    static_dir     = os.path.join(NEXT_DIR, "static")

    for p, name in [(standalone_dir, ".next/standalone"), (static_dir, ".next/static"), (PUBLIC_DIR, "public")]:
        if not os.path.exists(p):
            raise SystemExit(f"[error] Required path not found: {p}\nRun `npm run build` first.")

    print(f"Building tarball from {PROJECT_ROOT}...")
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        tar.add(standalone_dir, arcname=".next/standalone")
        tar.add(static_dir,     arcname=".next/static")
        tar.add(PUBLIC_DIR,     arcname="public")
    data = buf.getvalue()
    print(f"  tarball size: {len(data) / 1024 / 1024:.2f} MB")
    return data


def main():
    tarball = make_tarball()

    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"\nConnecting to {HOST}...")
    c.connect(HOST, username=USER, password=PASS, timeout=15)
    print("Connected.")

    # ── Phase 1: Remove old static site ──────────────────────────────────────
    run(c, label="Phase 1: Remove old static site",
        cmd=f"rm -rf {OLD_STATIC_DIR}; echo removed",
        allow_fail=True)
    run(c, f"rm -f {OLD_NGINX_ENABL} {OLD_NGINX_AVAIL}; echo removed", allow_fail=True)

    # ── Phase 2: Preserve .env and DB from existing deploy ──────────────────
    run(c, label="Phase 2: Preserve runtime data",
        cmd="rm -rf /tmp/_spwi_keep && mkdir -p /tmp/_spwi_keep")
    run(c, f"cp {REMOTE_DIR}/.env /tmp/_spwi_keep/env 2>/dev/null || true")
    run(c, f"cp {REMOTE_DIR}/prisma/dev.db /tmp/_spwi_keep/dev.db 2>/dev/null || true")
    run(c, f"cp {REMOTE_DIR}/prisma/dev.db-shm /tmp/_spwi_keep/ 2>/dev/null || true")
    run(c, f"cp {REMOTE_DIR}/prisma/dev.db-wal /tmp/_spwi_keep/ 2>/dev/null || true")

    # ── Phase 3: Upload tarball ───────────────────────────────────────────────
    print("\n=== Phase 3: Upload tarball ===")
    sftp = c.open_sftp()
    with sftp.open("/tmp/studiopwi.tar.gz", "wb") as f:
        f.write(tarball)
    sftp.close()
    print(f"  Uploaded /tmp/studiopwi.tar.gz ({len(tarball) / 1024 / 1024:.2f} MB)")

    # ── Phase 4: Extract and assemble ────────────────────────────────────────
    run(c, label="Phase 4: Extract",
        cmd="rm -rf /tmp/_spwi_build && mkdir -p /tmp/_spwi_build")
    run(c, "tar -xzf /tmp/studiopwi.tar.gz -C /tmp/_spwi_build && rm /tmp/studiopwi.tar.gz")

    run(c, f"rm -rf {REMOTE_DIR} && mkdir -p {REMOTE_DIR}")

    # standalone/ is the base (contains server.js, node_modules, .next/server chunks)
    run(c, f"bash -c 'shopt -s dotglob && cp -r /tmp/_spwi_build/.next/standalone/. {REMOTE_DIR}/'")

    # Merge static assets into .next
    run(c, f"cp -r /tmp/_spwi_build/.next/static {REMOTE_DIR}/.next/static")

    # Copy public/
    run(c, f"cp -r /tmp/_spwi_build/public {REMOTE_DIR}/public")

    run(c, "rm -rf /tmp/_spwi_build")

    # ── Phase 5: Restore .env and DB ────────────────────────────────────────
    run(c, label="Phase 5: Restore runtime data",
        cmd=f"mkdir -p {REMOTE_DIR}/prisma")
    run(c, f"cp /tmp/_spwi_keep/env {REMOTE_DIR}/.env 2>/dev/null || true")
    run(c, f"cp /tmp/_spwi_keep/dev.db {REMOTE_DIR}/prisma/dev.db 2>/dev/null || true")
    run(c, f"cp /tmp/_spwi_keep/dev.db-shm {REMOTE_DIR}/prisma/ 2>/dev/null || true")
    run(c, f"cp /tmp/_spwi_keep/dev.db-wal {REMOTE_DIR}/prisma/ 2>/dev/null || true")
    run(c, "rm -rf /tmp/_spwi_keep")

    if not run(c, f"test -f {REMOTE_DIR}/.env", allow_fail=True):
        print(f"\n[!] No .env found at {REMOTE_DIR}/.env — create it on the server before starting:")
        print(f"    NEXT_PUBLIC_SITE_URL=https://studiopwi.com")
        print(f"    DATABASE_URL=file:{REMOTE_DIR}/prisma/dev.db")
        print(f"    RESEND_API_KEY=re_...")
        print(f"    RESEND_FROM=contact@studiopwi.com")
        print(f"    LEADS_TO=contact@studiopwi.com")

    # Verify
    run(c, f"ls -la {REMOTE_DIR}/", label="content check")

    # ── Phase 6: Write nginx vhost ────────────────────────────────────────────
    print("\n=== Phase 6: Write nginx vhost ===")
    sftp = c.open_sftp()
    with sftp.open(OLD_NGINX_AVAIL, "w") as f:
        f.write(NGINX_VHOST)
    sftp.close()
    print(f"  Wrote {OLD_NGINX_AVAIL}")

    run(c, f"ln -sf {OLD_NGINX_AVAIL} {OLD_NGINX_ENABL}", label="enable site")
    run(c, "nginx -t", label="nginx -t")
    run(c, "systemctl reload nginx", label="reload nginx")

    # ── Phase 7: pm2 ────────────────────────────────────────────────────────
    print("\n=== Phase 7: pm2 ===")
    sftp = c.open_sftp()
    with sftp.open(f"{REMOTE_DIR}/ecosystem.config.cjs", "w") as f:
        f.write(ECOSYSTEM)
    sftp.close()

    run(c, f"pm2 delete {PM2_NAME} 2>/dev/null; echo ok", allow_fail=True)
    run(c, f"cd {REMOTE_DIR} && pm2 start ecosystem.config.cjs")
    run(c, "pm2 save")

    run(c, f"curl -s -o /dev/null -w 'HTTP %{{http_code}}\\n' http://127.0.0.1:{PORT}",
        label="local port probe", allow_fail=True)

    # ── Phase 8: certbot ─────────────────────────────────────────────────────
    print("\n=== Phase 8: certbot (Let's Encrypt) ===")
    code = run(c,
        f"certbot --nginx --non-interactive --agree-tos --email admin@{DOMAIN} "
        f"--redirect -d {DOMAIN} -d {WWW_DOMAIN}",
        timeout=180, allow_fail=True)
    if code != 0:
        print(f"\n[!] certbot exited {code} — DNS may not be pointed to {HOST} yet.")
        print(f"    HTTP is up. Once DNS resolves, run:")
        print(f"    ssh root@{HOST} \"certbot --nginx -d {DOMAIN} -d {WWW_DOMAIN} --redirect\"")
    else:
        print("[ok] certbot succeeded — HTTPS enabled.")

    # ── Summary ──────────────────────────────────────────────────────────────
    run(c, "pm2 status", label="pm2 status")
    run(c, "ls /etc/nginx/sites-enabled/ | sort", label="enabled nginx sites")

    c.close()
    print(f"\nDone. Site: http://{DOMAIN}/  (https once SSL is active)")


if __name__ == "__main__":
    main()
