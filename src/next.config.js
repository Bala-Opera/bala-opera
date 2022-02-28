const nextConfig = {
  images: {
    domains: [
      'localhost',
      'bala-opera.s3.amazonaws.com',
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config
  },
}

module.exports = nextConfig;