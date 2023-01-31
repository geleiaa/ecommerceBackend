const express = require('express');

const router = express.Router();

const Pedidos = require('./../database/models/pedidosModel');


router
.route('/')
.get( async (req, res) => { // GET roducts
    
    const pedidos = await Pedidos.findAll();

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
})

module.exports = router;