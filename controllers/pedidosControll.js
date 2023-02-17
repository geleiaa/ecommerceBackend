const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Clientes = require('../database/models/clientModel');
const Pedidos = require('../database/models/pedidosModel');


const fitrarClientPorData = async (req, res) => {

    const datePedido = req.params.date;
    const clientID = req.params.cliId;

    console.log('DADOS', clientID, datePedido);

    const pedidoClient = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.eq]: datePedido
            }
        },
        include: [clientID]
    })
    res.status(200).json({
        status: "Ok",
        data: pedidoClient
    })
}

const maisVendidoToDay = async (req, res) => {

    const maisVendido = await Pedidos.findAll({

    })
}

module.exports = {
    fitrarClientPorData
}