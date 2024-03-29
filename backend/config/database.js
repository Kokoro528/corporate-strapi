const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
// module.exports = ({ env }) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       //  host: env("DATABASE_HOST", "192.168.0.31"),
//       // host: env("DATABASE_HOST", "127.0.0.1"),
//       host: env("DATABASE_HOST", "123.60.2.137"),
//       // host: env("DATABASE_HOST", "124.70.131.148"),
//       port: env.int("DATABASE_PORT", 5432),
//       database: env("DATABASE_NAME", "strapi-corporate"),
//       user: env("DATABASE_USERNAME", "psyc"),
//       password: env("DATABASE_PASSWORD", "TongYuan123"),
//     },
//     useNullAsDefault: true,
//   },
// });
