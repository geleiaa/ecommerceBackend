const express = require('express');

const router = express.Router();

const Pedidos = require('../database/models/pedidosModel');
const Clientes = require('../database/models/clientModel');
const Produtos = require('../database/models/productsModel');
//const Estoque = require('../database/models/estoqueModel');
const pedidosController = require('../controllers/pedidosControll');

router
.route('/cliente/:cliId/date-filter/:date')
.get(pedidosController.fitrarClientPorData);

router
.route('/')
.get( async (req, res) => { // GET roducts
    
    const pedidos = await Pedidos.findAll({ include: [Clientes, Produtos]});

    res.status(200).json({
        status: "Ok",
        data: pedidos
    })
})

.post( async (req, res) => {
    const { produtoId, clientId, qunatidadeDoProd } = req.body

    const pedido = await Pedidos.create(req.body)

    res.status(201).json({
        status: "pedido criado",
        data: pedido
    })
});

router
.route('/:id')
.get( async (req, res) =>{ // GET user por id
    const pedidoId = req.params.id

    const pedido = await Pedidos.findAll({ where: { pedidoId }});

    res.status(200).json({
        status: "Ok",
        data: pedido
    })
})

.patch( async(req, res) =>{ // PATCH update product por id
    const pedidoId = req.params.id
    const { fields } = req.body

    const pedidoUpdated = await Estoque.update({fields}, {where: pedidoId})

    res.status(204).json({
        status: "estoque atualizado",
        data: pedidoUpdated
    })
})

.delete( async (req, res) => {
    const pedidoId = req.params.id

    await Estoque.destroy({where: pedidoId});

    res.status(200).json({
        status: "estoque removido"
    })
});

module.exports = router;