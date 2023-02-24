//const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

const app = require('./app');


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server up in port ${port}`);
});
