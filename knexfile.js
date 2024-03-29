const config = {
  client: "pg",
  connection: "postgresql://127.0.0.1:5432/hillel"
};

export default  {
  development: config,
  production: config
};
