const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtosControll');


router.route('/')
.get(produtosController.getTodosProdutos)
.post(produtosController.criarProduto);

router.route('/:id')
.get(produtosController.getOneProduto)
.patch(produtosController.atualizarProduto)
.delete(produtosController.deleteProduto);

module.exports = router;