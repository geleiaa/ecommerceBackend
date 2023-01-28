const express = require('express');

const clientRoutes = require('./../routes/clientRoutes');
const productsRoutes = require('./../routes/productsRoutes');
// const buysRoutes = require('');

const app = express();

app.use(express.json());

app.use('/api/v4/user', clientRoutes);
app.use('/api/v4/products', productsRoutes);
// app.use('/api/v4/buys', buysRoutes);

module.exports = app;