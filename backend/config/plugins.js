module.exports = ({ env }) => ({
  upload: {
    config: {
      // provider: 'huaweicloud-obs',
      // providerOptions: {
      //   accessKeyId: env('HUAWEICLOUD_ACCESS_KEY_ID'),
      //   secretAccessKey: env('HUAWEICLOUD_ACCESS_SECRET'),
      //   // region: env('AWS_REGION'),
      //   server: env('OBS_SERVER'),
      //   params: {
      //     bucket: env('OBS_BUCKET_NAME'),
      //   },
      // },
    }

  },
  meilisearch: {
    config: {
      host: "http://localhost:7700",
      // apiKey: "masterKey"
    }
  },
  deepl: {
    enabled: true,
    config: {
      // your DeepL API key
      apiKey: 'key',
      // whether to use the free or paid api, default true
      freeApi: true,
      // Which field types are translated (default string, text, richtext, components and dynamiczones)
      translatedFieldTypes: [
        'string',
        'text',
        'richtext',
        'component',
        'dynamiczone',
      ],
      // If relations should be translated (default true)
      translateRelations: true,
      // You can define a custom glossary to be used here (see https://www.deepl.com/docs-api/managing-glossaries/)
      // glossaryId: 'customGlossary',
    },
  },
  // upload: {
  //   config: {
  //     providerOptions: {
  //       localServer: {
  //         maxage: 300000
  //       },
  //       basePath: "http://localhost:1337",
  //       dynamicallyPrefixed: true
  //     },
  //   },
  // }
});
