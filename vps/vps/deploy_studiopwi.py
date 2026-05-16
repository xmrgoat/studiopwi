#!/usr/bin/env python3
"""Deploy StudioPWI from GitHub to VPS.

Steps:
  1. Preserve .env and SQLite DB from existing /opt/studiopwi if present
  2. Remove old /var/www/studiopwi static site + its nginx vhost (legacy cleanup)
  3. Delete /opt/studiopwi entirely
  4. git clone https://github.com/xmrgoat/studiopwi into a temp build dir
  5. npm ci + npm run build (Next.js standalone output)
  6. Assemble standalone at /opt/studiopwi
  7. Restore .env and DB
  8. Write nginx reverse-proxy vhost for studiopwi.com
  9. Start / restart via pm2
 10. Run certbot (graceful if DNS not pointed yet)

Before running:
  python vps/vps/deploy_studiopwi.py
"""
import sys
import os
import paramiko

os.environ.setdefault("PYTHONIOENCODING", "utf-8")
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

HOST       = "185.142.53.199"
USER       = "root"
PASS       = "*I-1LI9QX=nq"
DOMAIN     = "studiopwi.com"
WWW_DOMAIN = "www.studiopwi.com"
REMOTE_DIR = "/opt/studiopwi"
BUILD_DIR  = "/tmp/_spwi_src"
PORT       = 3002
PM2_NAME   = "studiopwi"
GITHUB_REPO = "https://github.com/xmrgoat/studiopwi"

OLD_STATIC_DIR  = "/var/www/studiopwi"
OLD_NGINX_AVAIL = f"/etc/nginx/sites-available/{DOMAIN}"
OLD_NGINX_ENABL = f"/etc/nginx/sites-enabled/{DOMAIN}"

NGINX_VHOST = f"""# {DOMAIN} — managed by deploy_studiopwi.py (certbot will add HTTPS block)
server {{
    listen 80;
    listen [::]:80;
    server_name {DOMAIN} {WWW_DOMAIN};

    client_max_body_size 50M;

    location /_next/static/ {{
        alias {REMOTE_DIR}/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }}

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


def run(c, cmd, timeout=300, label=None, allow_fail=False):
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


def main():
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"\nConnecting to {HOST}...")
    c.connect(HOST, username=USER, password=PASS, timeout=15)
    print("Connected.")

    # ── Phase 1: Preserve .env and DB ────────────────────────────────────────
    run(c, label="Phase 1: Preserve runtime data",
        cmd="rm -rf /tmp/_spwi_keep && mkdir -p /tmp/_spwi_keep")
    run(c, f"cp {REMOTE_DIR}/.env /tmp/_spwi_keep/env 2>/dev/null || true")
    run(c, f"cp {REMOTE_DIR}/prisma/dev.db /tmp/_spwi_keep/dev.db 2>/dev/null || true")
    run(c, f"cp {REMOTE_DIR}/prisma/dev.db-shm /tmp/_spwi_keep/ 2>/dev/null || true")
    run(c, f"cp {REMOTE_DIR}/prisma/dev.db-wal /tmp/_spwi_keep/ 2>/dev/null || true")

    # ── Phase 2: Remove legacy static site ───────────────────────────────────
    run(c, label="Phase 2: Remove legacy static site",
        cmd=f"rm -rf {OLD_STATIC_DIR}; echo removed",
        allow_fail=True)
    run(c, f"rm -f {OLD_NGINX_ENABL} {OLD_NGINX_AVAIL}; echo removed", allow_fail=True)

    # ── Phase 3: Delete existing /opt/studiopwi ───────────────────────────────
    run(c, label="Phase 3: Delete existing deploy",
        cmd=f"rm -rf {REMOTE_DIR} && echo deleted")

    # ── Phase 4: Clone from GitHub ────────────────────────────────────────────
    run(c, label="Phase 4: Clone from GitHub",
        cmd=f"rm -rf {BUILD_DIR} && git clone --depth=1 {GITHUB_REPO} {BUILD_DIR}",
        timeout=120)

    # ── Phase 5: Install deps and build ──────────────────────────────────────
    run(c, label="Phase 5a: npm ci",
        cmd=f"cd {BUILD_DIR} && npm ci",
        timeout=300)
    run(c, label="Phase 5b: npm run build",
        cmd=f"cd {BUILD_DIR} && npm run build",
        timeout=600)

    # ── Phase 6: Assemble standalone at /opt/studiopwi ───────────────────────
    run(c, label="Phase 6: Assemble standalone",
        cmd=f"mkdir -p {REMOTE_DIR}")
    run(c, f"bash -c 'shopt -s dotglob && cp -r {BUILD_DIR}/.next/standalone/. {REMOTE_DIR}/'")
    run(c, f"cp -r {BUILD_DIR}/.next/static {REMOTE_DIR}/.next/static")
    run(c, f"cp -r {BUILD_DIR}/public {REMOTE_DIR}/public")
    run(c, f"rm -rf {BUILD_DIR} && echo cleaned")

    # ── Phase 7: Restore .env and DB ─────────────────────────────────────────
    run(c, label="Phase 7: Restore runtime data",
        cmd=f"mkdir -p {REMOTE_DIR}/prisma")
    run(c, f"cp /tmp/_spwi_keep/env {REMOTE_DIR}/.env 2>/dev/null || true")
    run(c, f"cp /tmp/_spwi_keep/dev.db {REMOTE_DIR}/prisma/dev.db 2>/dev/null || true")
    run(c, f"cp /tmp/_spwi_keep/dev.db-shm {REMOTE_DIR}/prisma/ 2>/dev/null || true")
    run(c, f"cp /tmp/_spwi_keep/dev.db-wal {REMOTE_DIR}/prisma/ 2>/dev/null || true")
    run(c, "rm -rf /tmp/_spwi_keep")

    if run(c, f"test -f {REMOTE_DIR}/.env", allow_fail=True) != 0:
        print(f"\n[!] No .env at {REMOTE_DIR}/.env — create it on the server:")
        print(f"    NEXT_PUBLIC_SITE_URL=https://studiopwi.com")
        print(f"    DATABASE_URL=file:{REMOTE_DIR}/prisma/dev.db")
        print(f"    RESEND_API_KEY=re_...")
        print(f"    RESEND_FROM=contact@studiopwi.com")
        print(f"    LEADS_TO=contact@studiopwi.com")

    run(c, f"ls -la {REMOTE_DIR}/", label="content check")

    # ── Phase 8: Write nginx vhost ────────────────────────────────────────────
    print("\n=== Phase 8: Write nginx vhost ===")
    sftp = c.open_sftp()
    with sftp.open(OLD_NGINX_AVAIL, "w") as f:
        f.write(NGINX_VHOST)
    sftp.close()
    print(f"  Wrote {OLD_NGINX_AVAIL}")

    run(c, f"ln -sf {OLD_NGINX_AVAIL} {OLD_NGINX_ENABL}", label="enable site")
    run(c, "nginx -t", label="nginx -t")
    run(c, "systemctl reload nginx", label="reload nginx")

    # ── Phase 9: pm2 ─────────────────────────────────────────────────────────
    print("\n=== Phase 9: pm2 ===")
    sftp = c.open_sftp()
    with sftp.open(f"{REMOTE_DIR}/ecosystem.config.cjs", "w") as f:
        f.write(ECOSYSTEM)
    sftp.close()

    run(c, f"pm2 delete {PM2_NAME} 2>/dev/null; echo ok", allow_fail=True)
    run(c, f"cd {REMOTE_DIR} && pm2 start ecosystem.config.cjs")
    run(c, "pm2 save")

    run(c, f"curl -s -o /dev/null -w 'HTTP %{{http_code}}\\n' http://127.0.0.1:{PORT}",
        label="local port probe", allow_fail=True)

    # ── Phase 10: certbot ─────────────────────────────────────────────────────
    print("\n=== Phase 10: certbot (Let's Encrypt) ===")
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

    # ── Summary ───────────────────────────────────────────────────────────────
    run(c, "pm2 status", label="pm2 status")
    run(c, "ls /etc/nginx/sites-enabled/ | sort", label="enabled nginx sites")

    c.close()
    print(f"\nDone. Site: https://{DOMAIN}/")


if __name__ == "__main__":
    main()
