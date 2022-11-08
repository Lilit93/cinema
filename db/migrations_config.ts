const dotenv = require("dotenv");
dotenv.config();
const config = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "cinema",
    dialect: "postgres",
    logging: true,
};
module.exports = config;
