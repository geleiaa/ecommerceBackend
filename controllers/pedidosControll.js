const sequelize = require('sequelize');
const { Op } = require('sequelize');


const Clientes = require('../database/models/clientModel');
const Produtos = require('../database/models/productsModel');
const Pedidos = require('../database/models/pedidosModel');


const getTodosPedidos = async (req, res) => { // GET pedidos

    const pedidos = await Pedidos.findAll({ include: [Clientes, Produtos] });

    res.status(200).json({
        status: "Ok",
        pedidos: pedidos
    })
}

const criarPedido = async (req, res) => { // POST pedido
    const prodId = req.body.produtoId
    const clientId = req.body.clienteId
    const quantidade = req.body.qauntidadeDoProd

    const pedido = await Pedidos.create({
        prodId,
        clientId,
        quantidade
    });

    await axios.post('http://localhost:1234/pedidos/estoque', {
        text: "Testando..."
    })

    res.status(200).json({
        status: "Ok",
        pedidos: pedidos
    })
}

const getOnePedido = async (req, res) => { // GET pedido por id
    const pedidoId = req.params.id

    const pedido = await Pedidos.findAll({ where: { pedidoId } });

    res.status(200).json({
        status: "Ok",
        pedido: pedido
    })
}

const atualizarPedido = async (req, res) => { // PATCH update pedido por id
    const pedidoId = req.params.id
    const { fields } = req.body

    const pedidoUpdated = await Estoque.update({ fields }, { where: pedidoId })

    res.status(204).json({
        status: "estoque atualizado",
        pedido: pedidoUpdated
    })
}

const deletePedido = async (req, res) => { // DELETE pedido por id
    const pedidoId = req.params.id

    await Estoque.destroy({ where: pedidoId });

    res.status(200).json({
        status: "pedido removido"
    })
}


const fitrarClientPorData = async (req, res) => {

    const clientID = req.params.cliId;
    const date = new Array(req.params.date);
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))

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

    const date = new Array(req.params.date);
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))

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

const clienteMaisCompraPorData = async (req, res) => {

    const date = new Array(req.params.date);
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))
    console.log(datePedido);

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
    getTodosPedidos,
    getOnePedido,
    criarPedido,
    atualizarPedido,
    deletePedido,
    fitrarClientPorData,
    maisVendidoPorData,
    clienteMaisCompraPorData
}