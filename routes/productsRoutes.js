const express = require('express');

const router = express.Router();

const Estoque = require('../database/models/estoqueModel');
const Products = require('./../database/models/productsModel');

router
.route('/')
.get( async (req, res) => { // GET roducts
    
    const products = await Products.findAll({ include: Estoque});

    res.status(200).json({
        status: "Ok",
        data: products
    })
})
.post( async (req, res) => { // POST create user
    const {nome, preço, quatidadeEstq} = req.body

    const product = await Products.create(req.body)

    res.status(201).json({
        status: "produto criado",
        data: product
    })
})

// router
// .route('/:id')
// .get( async (req, res) =>{ // GET user por id
//     const productId = req.params.id

//     const product = await findById(productId);

//     res.status(200).json({
//         status: "Ok",
//         data: product
//     })
// })

// .patch( async(req, res) =>{ // PATCH update product por id
//     const productId = req.params.id
//     const { fields } = req.body

//     const productUpdated = await findByIdAndUpdate(productId, fields)

//     res.status(204).json({
//         status: "produto atualizado",
//         data: productUpdated
//     })
// })

// .delete( async (req, res) => {
//     const productId = req.params.id

//     await deleteById(productId);

//     res.status(200).json({
//         status: "produto removido"
//     })
// })

module.exports = router;