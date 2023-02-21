const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Clientes = require('../database/models/clientModel');
const Produtos = require('../database/models/productsModel');
const Pedidos = require('../database/models/pedidosModel');




const fitrarClientPorData = async (req, res) => {

    const clientID = req.params.cliId;
    const [...date] = req.params.date;
    let datePedido = '';
    for (let dt of date) {
        datePedido = new Date(dt)
    }

    console.log(datePedido);

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

const maisVendidoPorData = async (req, res) => {

    const [...date] = req.params.date;
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))
    //console.log(datePedido);
    // for (let dt of date) {
    //     datePedido = new Date(dt)
    // }

    const maisVendido = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.gte]: datePedido
            }
        },
        attributes: ['id', 'produtoId', 'createdAt',
        [sequelize.fn('COUNT', sequelize.col('produtoId')), 'pedidos']],
        group: ['id', 'produtoId']
    })

    res.status(200).json({
        status: "Ok",
        pedidos: maisVendido
    })
}

const clienteMaisCompraPorData = async (req, res) =>{
    
    const [...date] = req.params.date
    let datePedido = '';
    for (let dt of date) {
        datePedido = new Date(dt)
    }

    const maisCompra = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.gte]: datePedido
            }
        },
        attributes: ['id', 'clienteId', 'createdAt',
        [sequelize.fn('COUNT', sequelize.col('clienteId')), 'pedidos']],
        group: ['id', 'clienteId']
    })

    res.status(200).json({
        status: "Ok",
        pedidos: maisCompra
    })
}

module.exports = {
    fitrarClientPorData,
    maisVendidoPorData,
    clienteMaisCompraPorData
}