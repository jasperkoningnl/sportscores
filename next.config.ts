import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A fully static site: `npm run build` writes plain HTML/CSS/JS to ./out,
  // which any static host (Vercel, Netlify, GitHub Pages, S3…) can serve.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  // Do not write AGENTS.md / CLAUDE.md into the project on `next dev`.
  agentRules: false,
};

export default nextConfig;
