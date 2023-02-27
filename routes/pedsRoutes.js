const express = require('express');
const router = express.Router();

const pedidosController = require('../controllers/pedidosControll');

// mais sobre as rotas na documentação

router
.route('/date-filter/:date/cliente/:cliId')
.get(pedidosController.filtraPedidosPorData);

router
.route('/mais-vendidos-em/:date')
.get(pedidosController.prodMaisVendidoPorData);

router
.route('/cliente-mais-compra/:date')
.get(pedidosController.clienteQueMaisCompraPorData)

router.route('/')
.get(pedidosController.getTodosPedidos)
.post(pedidosController.criarPedido);

router.route('/:id')
.get(pedidosController.getOnePedido)
.patch(pedidosController.atualizarPedido)
.delete(pedidosController.deletePedido);

module.exports = router;