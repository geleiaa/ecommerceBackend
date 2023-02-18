const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Clientes = require('../database/models/clientModel');
const Pedidos = require('../database/models/pedidosModel');


const fitrarClientPorData = async (req, res) => {

    const clientID = req.params.cliId;
    let date = new Array(req.params.date);
    let datePedido = '';
    for (let dt of date){
        datePedido = new Date(dt)
    }

    const pedidoCliente = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.gte]: datePedido
            },
            clienteId: {
                [Op.eq]: clientID
            }
        },
        include: Clientes
    })

    res.status(200).json({
        status: "Ok",
        pedido: pedidoCliente
    })
}

const maisVendidoToDay = async (req, res) => {

    const maisVendido = await Pedidos.findAll({

    })
}

module.exports = {
    fitrarClientPorData
}