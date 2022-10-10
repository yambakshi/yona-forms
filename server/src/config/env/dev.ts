export default {
    nodeEnv: process.env.NODE_ENV,
    apiPort: Number(process.env.API_PORT),
    cors: {
        origin: process.env.CORS_ORIGIN
    },
    postgresql: {        
        user: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD,
        host: process.env.POSTGRESQL_HOST,
        database: process.env.POSTGRESQL_DB,
        port: Number(process.env.POSTGRESQL_PORT)
    },
}