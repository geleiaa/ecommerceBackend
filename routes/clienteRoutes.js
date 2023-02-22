const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clienteControll');

router.route('/')
.get(clientesController.getTodosClientes)
.post(clientesController.criarCliente);

router.route('/:id')
.get(clientesController.getOneCliente)
.patch(clientesController.atualizarCliente)
.delete(clientesController.deleteCliente);

module.exports = router;