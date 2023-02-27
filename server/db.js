// CONEXÃO COM O DB 
// necessario para ter mais de um model
// tentar conectar no db em cada arquivo de model não funcinou

const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

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