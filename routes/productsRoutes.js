const express = require('express');

const router = express.Router();

const Estoque = require('../database/models/estoqueModel');
const Products = require('./../database/models/productsModel');

router
.route('/')
.get( async (req, res) => { // GET roducts
    
    const products = await Products.findAll({ include: Estoque });

    res.status(200).json({
        status: "Ok",
        data: products
    })
})
.post( async (req, res) => { // POST create user
    const nome = req.body.nome
    const preço = req.body.preço 
    const estoqId = req.body.estoqueId

    const product = await Products.create({
        nome,
        preço,
        estoqId
    })

    res.status(201).json({
        status: "produto criado",
        data: product
    })
})

router
.route('/:id')
.get( async (req, res) =>{ // GET user por id
    const productId = req.params.id

    const product = await findAll({where: productId});

    res.status(200).json({
        status: "Ok",
        data: product
    })
})

.patch( async(req, res) =>{ // PATCH update product por id
    const productId = req.params.id
    const { fields } = req.body

    const productUpdated = await findByIdAndUpdate({fields}, {where: productId})

    res.status(204).json({
        status: "produto atualizado",
        data: productUpdated
    })
})

.delete( async (req, res) => {
    const productId = req.params.id

    await destroy({where: productId})

    res.status(200).json({
        status: "produto removido"
    })
})

module.exports = router;