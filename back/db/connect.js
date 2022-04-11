const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      user: config.user,
      host: config.host,
      port: config.port,
      database: config.database,
      password: config.password,
      schema: "public",
      ssl: { rejectUnauthorized: false },
    },
  },
});
