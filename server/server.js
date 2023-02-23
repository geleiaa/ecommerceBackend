//const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const app = require('./app');

const produtosController = require('../controllers/produtosControll');


process.on("INSERT INTO 'pedidos'", () => {
    console.log('PASSOU!!!!');
    //produtosController.decrementEstoque();
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server up in port ${port}`);
});
