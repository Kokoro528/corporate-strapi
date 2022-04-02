module.exports = ({ env }) => ({
  // upload: {
  //   config: {
  //     provider: 'huaweicloud-obs',
  //     providerOptions: {
  //       accessKeyId: env('HUAWEICLOUD_ACCESS_KEY_ID'),
  //       secretAccessKey: env('HUAWEICLOUD_ACCESS_SECRET'),
  //       // region: env('AWS_REGION'),
  //       server: env('OBS_SERVER'),
  //       params: {
  //         bucket: env('OBS_BUCKET_NAME'),
  //       },
  //     },
  //   }

  // },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  }
});
