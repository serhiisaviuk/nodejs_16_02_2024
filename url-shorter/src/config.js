export default {
    serverPepper: process.env.SERVER_PEPPER ?? "PEPPER",
    dbConfig: {
        client: "pg",
        connection: process.env.PG_URL ?? "postgresql://127.0.0.1:5432/hillel",
        pool: {
            min: 2,
            max: 10
        }
    }
}
