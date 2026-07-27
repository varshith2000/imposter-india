/** @type {import('next').NextConfig} */

// GITHUB_PAGES=true switches to a fully static export (set by the deploy workflow).
// NEXT_PUBLIC_BASE_PATH is "/<repo-name>" for project pages, empty for user pages / custom domains.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        // headers are not supported in static export — only applied when self-hosted / Vercel
        headers: async () => [
          {
            source: "/:path*",
            headers: [
              { key: "X-Frame-Options", value: "DENY" },
              { key: "X-Content-Type-Options", value: "nosniff" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            ],
          },
        ],
      }),
};

export default nextConfig;
