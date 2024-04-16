export default {
    serverPepper: process.env.SERVER_PEPPER ?? "PEPPER",
    dbConfig: {
        client: "pg",
        connection: process.env.PG_URL ?? "postgresql://127.0.0.1:5432/hillel",
        pool: {
            min: 2,
            max: 10
        }
    },
    port: process.env.PORT || 3001,
    hostname: process.env.HOSTNAME || "127.0.0.1",
    redisUrl: process.env.REDIS_URL || "redis://@127.0.0.1:6380"
}
