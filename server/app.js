const express = require('express');

const clienteRoutes = require('../routes/clienteRoutes');
const produtosRoutes = require('../routes/prodsRoutes');
const pedidosRoutes = require('../routes/pedsRoutes');

const app = express();

app.use(express.json());

app.use('/api/v4/clientes', clienteRoutes);
app.use('/api/v4/produtos', produtosRoutes);
app.use('/api/v4/pedidos', pedidosRoutes);

module.exports = app;