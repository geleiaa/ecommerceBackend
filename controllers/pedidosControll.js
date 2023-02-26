const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

const Clientes = require('../database/models/clientModel');
const Produtos = require('../database/models/productsModel');
const Pedidos = require('../database/models/pedidosModel');

const produtosController = require('../controllers/produtosControll');


const getTodosPedidos = async (req, res) => { // GET pedidos

    const pedidos = await Pedidos.findAll({ include: [Clientes, Produtos] });

    res.status(200).json({
        status: "Ok",
        pedidos: pedidos
    })
}

const criarPedido = async (req, res) => { // POST pedido
    const produtoId = req.body.produtoId;
    const clienteId = req.body.clienteId;
    const quantidadeDoProd = req.body.quantidadeDoProd;

    const pedido = await Pedidos.create({
        produtoId,
        clienteId,
        quantidadeDoProd
    });

    res.status(200).json({
        status: 'pedido criado',
        pedidos: pedido
    })

    eventEmitter.on('pedido criado', ped => {
        produtosController.decrementEstoque(ped);
    });

    eventEmitter.emit('pedido criado', pedido);
}

const getOnePedido = async (req, res) => { // GET pedido por id
    const pedidoId = req.params.id

    const pedido = await Pedidos.findOne({ where: { pedidoId } });

    res.status(200).json({
        status: "Ok",
        pedido: pedido
    })
}

const atualizarPedido = async (req, res) => { // PATCH update pedido por id
    const pedidoId = req.params.id
    const { fields } = req.body

    const pedidoUpdated = await Pedidos.update({ fields }, { where: pedidoId })

    res.status(204).json({
        status: "pedido atualizado",
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

const filtraPedidosPorData = async (req, res) => {

    const clientID = req.params.cliId;
    const date = [req.params.date];
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

const prodMaisVendidoPorData = async (req, res) => {

    const date = [req.params.date];
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))

    const vendidos = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.gte]: datePedido
            }
        },
        include: Produtos,
        attributes: {
            exclude: ['updatedAt', 'quantidadeDoProd', 'clienteId']
        }
    })

    const maisVendidos = vendidos.map(vd => vd.produtoId); //usar no front

    res.status(200).json({
        status: "Ok",
        pedidos: vendidos,
        produtos: maisVendidos
    })
}

const clienteQueMaisCompraPorData = async (req, res) => {

    const date = [req.params.date];
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))

    const maisCompra = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.gte]: datePedido
            }
        },
        include: Clientes,
        attributes: {
            exclude: ['updatedAt', 'quantidadeDoProd', 'produtoId']
        }
    })

    const clientes = maisCompra.map(cl => cl.clienteId) //usar no front


    res.status(200).json({
        status: "Ok",
        pedidos: maisCompra,
        clientes: clientes
    })
}

module.exports = {
    getTodosPedidos,
    getOnePedido,
    criarPedido,
    atualizarPedido,
    deletePedido,
    filtraPedidosPorData,
    prodMaisVendidoPorData,
    clienteQueMaisCompraPorData
}