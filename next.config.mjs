/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出：产物在 out/，Vercel / 任意静态托管都能直接跑
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
