const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Clientes = require('../database/models/clientModel');
const Produtos = require('../database/models/productsModel');
const Pedidos = require('../database/models/pedidosModel');

const produtosController = require('../controllers/produtosControll');


const getTodosPedidos = async (req, res) => { // GET pedidos

    const pedidos = await Pedidos.findAll({ include: [Clientes, Produtos] }); // include = association = relationships

    res.status(200).json({
        status: "Ok",
        pedidos: pedidos
    })
} // NOTA: add pagination

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

    // dispara um evento e chama uma função para atualizar o estoque
    eventEmitter.on('pedido criado', ped => {
        produtosController.decrementEstoque(ped);
        console.log('PedContr', ped);
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
    const date = [req.params.date]; // data para array
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt)) // data no formato que esta no banco 2023-02-01T19:34:51.316Z

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

    const date = [req.params.date]; // data para array
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt)) // data no formato que esta no banco 2023-02-01T19:34:51.316Z

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

    let maisVendidos = [];
    vendidos.filter(vd => maisVendidos = vd)

    res.status(200).json({
        status: "Ok",
        produtos: maisVendidos
    })
} // NOTA: melhorar func prodMaisVendidoPorData

const clienteQueMaisCompraPorData = async (req, res) => {

    const date = [req.params.date]; // data para array
    let datePedido = '';
    date.filter(dt => datePedido = new Date(dt))  // data no formato que esta no banco 2023-02-01T19:34:51.316Z

    const clientes = await Pedidos.findAll({
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

    let maisCompra = [];
    clientes.filter(cl => maisCompra = cl)

    res.status(200).json({
        status: "Ok",
        clientes: maisCompra
    })
} // NOTA: melhorar clienteQueMaisCompraPorData também 

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