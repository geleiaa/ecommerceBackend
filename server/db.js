// DATABASE CONNECTION
const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

// const sequelizie = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
)

try {
    sequelize.authenticate();
    console.log('Postgres connection successfully.');
  } catch (error) {
    console.error('DEU RUIM AI!!', error);
  }

module.exports = sequelize;