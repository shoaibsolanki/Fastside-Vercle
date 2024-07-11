/** @type {import('next').NextConfig} */
const isDev = false;

const nextConfig = {
  images: {
    domains: [isDev ? "103.148.165.246" : "103.139.59.233"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|avi|mov|mkv)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
          esModule: false,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
