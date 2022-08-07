module.exports = {
  i18n: {
    // locales: ['en', 'zh','fr'],
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  // future: { webpack5: true },
  images: {
    domains: ['localhost', 'strapi.obs.cn-east-3.myhuaweicloud.com', 'tongyuan.cc'],
    // domains: ['localhost']
  },

  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   // Important: return the modified config
  //   return config
  // },
}
