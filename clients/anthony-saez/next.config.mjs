/** Site 100 % statique (export) : rapide, sans serveur, hébergé sur Vercel. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
}
export default nextConfig
