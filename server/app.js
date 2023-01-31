const express = require('express');

const clientRoutes = require('./../routes/clientRoutes');
const productsRoutes = require('./../routes/productsRoutes');
const testRoutes = require('./../routes/testeRoute');
const testRoutes2 = require('./../routes/testRoute2');

// const buysRoutes = require('');

const app = express();

app.use(express.json());

app.use('/api/v4/user', clientRoutes);
app.use('/api/v4/products', productsRoutes);
// app.use('/api/v4/buys', buysRoutes);
app.use('/api/v4/pedidos', testRoutes2);
app.use('/api/v4/estoque', testRoutes);

module.exports = app;