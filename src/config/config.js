module.exports = {
    port: process.env.PORT || 3000,
    mongodb: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restapi_db",
    secret_key: process.env.SECRET_KEY || "6EJkNdtuxHbcDkUHO2eYbavmEDRyhtqG"
}