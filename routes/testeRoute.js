const express = require('express');

const router = express.Router();

const Estoque = require('./../database/models/estoqueModel');


router
.route('/')

.get( async (req, res) => { // GET roducts
    
    const stoq = await Estoque.findAll();

    res.status(200).json({
        status: "Ok",
        data: stoq
    })
})

.post( async (req, res) => {
    const { quantidade } = req.body;

    console.log(req.body);

    const estqProd = await Estoque.create(req.body)

    res.status(201).json({
        status: "estocado",
        data: estqProd
    })
})


module.exports = router;