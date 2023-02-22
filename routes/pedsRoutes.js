const express = require('express');
const router = express.Router();

const pedidosController = require('../controllers/pedidosControll');

router
.route('/date-filter/:date/cliente/:cliId')
.get(pedidosController.fitrarClientPorData);

router
.route('/mais-vendidos-em/:date')
.get(pedidosController.maisVendidoPorData);

router
.route('/cliente-mais-compra/:date')
.get(pedidosController.clienteMaisCompraPorData)

router.route('/')
.get(pedidosController.getTodosPedidos)
.post(pedidosController.criarPedido);

router.route('/:id')
.get(pedidosController.getOnePedido)
.patch(pedidosController.atualizarPedido)
.delete(pedidosController.deletePedido);

module.exports = router;