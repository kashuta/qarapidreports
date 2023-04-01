require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        username: process.env.DB_TEST_USER,
        password: process.env.DB_TEST_PASS,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_TEST_HOST,
        dialect: process.env.DB_TEST_DIALECT,
    },
    production: {
        username: process.env.DB_PROD_USER,
        password: process.env.DB_PROD_PASS,
        database: process.env.DB_PROD_NAME,
        host: process.env.DB_PROD_HOST,
        dialect: process.env.DB_PROD_DIALECT,
    }
}
