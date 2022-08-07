module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8618813f55f41944c3977e1a5cbd9518'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', '927a043df3418770473dbfa09c378075')
  }
});
