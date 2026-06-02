import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  experimental: {
    optimizePackageImports: ["gsap", "lenis"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1440, 1920],
  },
  webpack: (config, { isServer }) => {
    // Next.js unconditionally bundles a legacy polyfill shim
    // (next/dist/build/polyfills/polyfill-module — trimStart/trimEnd, flat,
    // flatMap, Object.fromEntries, Object.hasOwn, Array.prototype.at, etc.)
    // into the client runtime. `browserslist` only governs transpilation of
    // OUR code, never this shim, so it ships even though every browser our
    // browserslist targets (chrome>=93, firefox>=92, safari>=15.4, edge>=93)
    // supports all of those methods natively. Replace it with an empty module
    // on the client to drop the ~12 KiB Lighthouse flags as "legacy JavaScript".
    if (!isServer) {
      // The shim is pulled in via a relative `require("../build/polyfills/
      // polyfill-module")` inside Next's client bootstrap, so it must be
      // aliased by its resolved ABSOLUTE path (a bare-specifier alias never
      // matches the relative request). `false` swaps it for an empty module.
      const polyfillModule = require.resolve(
        "next/dist/build/polyfills/polyfill-module",
      );
      config.resolve.alias = {
        ...config.resolve.alias,
        [polyfillModule]: false,
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/videos/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default config;
