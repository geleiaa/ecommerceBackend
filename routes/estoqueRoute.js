const express = require('express');

const router = express.Router();

const Estoque = require('../database/models/estoqueModel');
const Produtos = require('../database/models/productsModel');


router
.route('/')

.get( async (req, res) => { // GET roducts
    
    const stoq = await Estoque.findAll({ include: Produtos });

    res.status(200).json({
        status: "Ok",
        data: stoq
    })
}) 

.post( async (req, res) => {
    const prodId = req.body.produtoId
    const quantidade  = req.body.quantidade;

    const estqProd = await Estoque.create({quantidade, prodId})

    res.status(201).json({
        status: "estocado",
        data: estqProd
    })
})

router
.route('/:id')
.get( async (req, res) =>{ // GET user por id
    const stqId = req.params.id

    const stq = await Estoque.findAll({ where: { stqId }});

    res.status(200).json({
        status: "Ok",
        data: stq
    })
})

.patch( async(req, res) =>{ // PATCH update product por id
    const stqId = req.params.id
    const { fields } = req.body

    const stqUpdated = await Estoque.update({fields}, {where: stqId})

    res.status(204).json({
        status: "estoque atualizado",
        data: stqUpdated
    })
})

.delete( async (req, res) => {
    const stqId = req.params.id

    await Estoque.destroy({where: stqId});

    res.status(200).json({
        status: "estoque removido"
    })
})


module.exports = router;