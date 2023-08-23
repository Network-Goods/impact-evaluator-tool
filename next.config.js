const nextConfig = {
  env: require("./loadconfig"),
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
