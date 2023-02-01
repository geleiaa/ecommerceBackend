const express = require('express');

const clientRoutes = require('./../routes/clientRoutes');
const productsRoutes = require('./../routes/productsRoutes');
const estoqueRoute = require('./../routes/estoqueRoute');
const pedidosRoute = require('./../routes/pedidosRoute');

// const buysRoutes = require('');

const app = express();

app.use(express.json());

app.use('/api/v4/user', clientRoutes);
app.use('/api/v4/products', productsRoutes);
// app.use('/api/v4/buys', buysRoutes);
app.use('/api/v4/pedidos', pedidosRoute);
app.use('/api/v4/estoque', estoqueRoute);

module.exports = app;