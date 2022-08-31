module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'strapi.obs.cn-east-3.myhuaweicloud.com', 'dl.airtable.com', 'tongyuan.cc'],
          'media-src': ["'self'", 'data:', 'blob:', 'strapi.obs.cn-east-3.myhuaweicloud.com', 'tongyuan.cc'],
          "script-src": ["'self'", "https:", "http:"],
          "frame-src": ["'self'", "https:", "http:"]
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },

  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
