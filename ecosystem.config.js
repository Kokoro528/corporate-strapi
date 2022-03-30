module.exports = {
  apps: [
    {
      name: 'strapi',
      cwd: '/root/corporate-strapi/backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'development',
        DATABASE_HOST: '192.168.0.31', // database Endpoint under 'Connectivity & Security' tab
        DATABASE_PORT: '5432',
        DATABASE_NAME: 'strapi-corporate', // DB name under 'Configuration' tab
        DATABASE_USERNAME: 'psyc', // default username
        DATABASE_PASSWORD: 'TongYuan123',
        HUAWEICLOUD_ACCESS_KEY_ID: 'YJ8JCJ7HVYPZKBBMGIXN',
        HUAWEICLOUD_ACCESS_SECRET: 'buToFjirTliTiVgUAa7RXMxfwk9KOY7W4zk9591T', // Find it in Amazon S3 Dashboard
        AWS_REGION: 'aws-region',
        OBS_BUCKET_NAME: 'strapi',
      },
    },
  ],
};
 
