/** @type {import('next').NextConfig} */
const isDev = true
const nextConfig = {
    images: {
      domains: [isDev?'103.148.165.246':'103.139.59.233'],
    },
  };

export default nextConfig;
