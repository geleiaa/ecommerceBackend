const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clienteControll');

// mais sobre as rotas na documentação

router.route('/')
.get(clientesController.getTodosClientes)
.post(clientesController.criarCliente);

router.route('/:id')
.get(clientesController.getOneCliente)
.patch(clientesController.atualizarCliente)
.delete(clientesController.deleteCliente);

module.exports = router;