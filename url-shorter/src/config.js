export default {
    serverPepper: process.env.SERVER_PEPPER ?? "PEPER",
    postgresUrl: process.env.PG_URL ?? "postgresql://127.0.0.1:5432/hillel"
}
