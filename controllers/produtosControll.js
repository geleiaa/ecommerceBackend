const {sequelize, Op} = require('sequelize');

const Produtos = require('../database/models/productsModel');


const getTodosProdutos =  async (req, res) => { // GET produtos
    
    const produtos = await Produtos.findAll();

    res.status(200).json({
        status: "Ok",
        produtos: produtos
    })
} // NOTA: add pagination


const criarProduto = async (req, res) => { // POST create produto
    const name = req.body.name;
    const preço = req.body.preço;
    const estoque = req.body.estoque;

    const produtos = await Produtos.create({name, preço, estoque})

    res.status(201).json({
        status: "produto criado",
        produtos: produtos
    })
}


const getOneProduto = async (req, res) =>{ // GET produto por id
    const productId = req.params.id

    const produtos = await Produtos.findOne({ where: productId });

    res.status(200).json({
        status: "Ok",
        produtos: produtos
    })
}


const atualizarProduto = async(req, res) =>{ // PATCH update produto por id
    const productId = req.params.id
    const { fields } = req.body

    const productUpdated = await update({fields}, {where: productId})

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

const decrementEstoque = async prod => {
    
    const prodVendido = [prod] // pega o id do pedido vindo do evento em pedidosControll
    let prodVendId = '';
    let prodVendQuant = '';
    prodVendido.filter(pr => {
        prodVendId = pr.produtoId
        prodVendQuant = pr.quantidadeDoProd
    }) // separa id do prod e quantidade comprada


    const prodComprado = await Produtos.findOne({
        where: {
            id: {
                [Op.eq]: prodVendId
            }
        }
    })

    await prodComprado.decrement('estoque', { by : prodVendQuant }) // atualiza estoque
    console.log(`Compraram ${prodVendQuant} de produto`);
}

module.exports = {
    getTodosProdutos,
    getOneProduto,
    criarProduto,
    atualizarProduto,
    deleteProduto,
    decrementEstoque
}