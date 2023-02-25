const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const sequelize  = require('sequelize');
const { Op } = require('sequelize');

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
    console.log(datePedido);

    const [results, metadata] = await Pedidos.sequelize.query(`
        SELECT p.id, p.produtoId, COUNT(*) as pedidos 
        FROM pedidos p join produtos r on p.produtoId = r.id
        WHERE DATE(p.createdAt) = ${datePedido} GROUP BY r.id, r.name 
    `)
    
    // .findAll({
    //     where: {
    //         createdAt: {
    //             [Op.gte]: datePedido
    //         }
    //     },
    //     attributes: ['id', 'produtoId',
    //         [sequelize.fn('COUNT', sequelize.col('produtoId')), 'pedidos']],
    //     group: ['id', 'produtoId']
    // })
    console.log('METADATA', metadata);
    res.status(200).json({
        status: "Ok",
        pedidos: results
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
        attributes: ['id', 'clienteId',
            [sequelize.fn('COUNT', sequelize.col('clienteId')), 'vendas']],
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
    filtraPedidosPorData,
    prodMaisVendidoPorData,
    clienteQueMaisCompraPorData
}