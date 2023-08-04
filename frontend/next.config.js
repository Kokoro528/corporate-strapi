module.exports = {
  i18n: {
    // locales: ['en', 'zh','fr'],
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false
  },
  // future: { webpack5: true },
  images: {
    domains: ['localhost', 'strapi.obs.cn-east-3.myhuaweicloud.com', 'tongyuan.cc'],
    // domains: ['localhost']
  },
  reactStrictMode: false,

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    // webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      })
  
    return config
  },
}
