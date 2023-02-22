const sequelize = require('sequelize');
//const { Op } = require('sequelize');
const Produtos = require('../database/models/productsModel');


const getTodosProdutos =  async (req, res) => { // GET produtos
    
    const produtos = await Produtos.findAll({ include: Estoque });

    res.status(200).json({
        status: "Ok",
        produtos: produtos
    })
}


const criarProduto = async (req, res) => { // POST create produto
    const nome = req.body.nome
    const preço = req.body.preço 
    const estoque = req.body.quantEstoque

    const produtos = await Produtos.create({
        nome,
        preço,
        estoque
    })

    res.status(201).json({
        status: "produto criado",
        produtos: produtos
    })
}


const getOneProduto = async (req, res) =>{ // GET produto por id
    const productId = req.params.id

    const produtos = await findAll({where: productId});

    res.status(200).json({
        status: "Ok",
        produtos: produtos
    })
}


const atualizarProduto = async(req, res) =>{ // PATCH update produto por id
    const productId = req.params.id
    const { fields } = req.body

    const productUpdated = await findByIdAndUpdate({fields}, {where: productId})

    res.status(204).json({
        status: "produto atualizado",
        produtos: productUpdated
    })
}


const deleteProduto = async (req, res) => { // DELETE produto por id
    const productId = req.params.id

    await destroy({where: productId})

    res.status(200).json({
        status: "produto removido"
    })
}

const decrementEstoque = async(req, res) => {
    console.log('DecreFunction',req);
}

module.exports = {
    getTodosProdutos,
    getOneProduto,
    criarProduto,
    atualizarProduto,
    deleteProduto,
    decrementEstoque
}