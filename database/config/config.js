require('dotenv').config({ path: './../config.env'});
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "ecommerce-dev",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}