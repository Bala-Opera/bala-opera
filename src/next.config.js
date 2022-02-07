module.exports = {
  images: {
    domains: [
      'localhost',
      'bala-opera.s3.amazonaws.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.node = {
      ...config.node,
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty',
    }
    return config;
  }
};