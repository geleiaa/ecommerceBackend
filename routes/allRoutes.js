const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clienteControll');
const pedidosController = require('../controllers/pedidosControll');

// Routes Clientes
router.route('/')
.get(clientesController.getTodosClientes)
.post(clientesController.criarCliente);

router.route('/:id')
.get(clientesController.getOneCliente)
.patch(clientesController.atualizarCliente)
.delete(clientesController.deleteCliente);
// Routes Clientes 

// Routes Produtos

// Routes Produtos

// Routes Pedidos
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
// Routes Pedidos


module.exports = router;