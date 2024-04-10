import config from "./url-shorter/src/config.js";

const dbConfig = {
  client: "pg",
  connection: config.postgresUrl
};

export default  {
  development: dbConfig,
  production: dbConfig
};
