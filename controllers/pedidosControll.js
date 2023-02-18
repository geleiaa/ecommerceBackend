const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Clientes = require('../database/models/clientModel');
const Pedidos = require('../database/models/pedidosModel');


const fitrarClientPorData = async (req, res) => {

    const clientID = req.params.cliId;
    let date = new Array(req.params.date);
    let datePedido = '';
    for (let dt of date){
        console.log('FOR', dt)
        datePedido = new Date(dt)
    }
    // date.map(dt => {
    //     return new Date(dt + "")
    // });

    console.log('DADOS', datePedido);

    const pedidoClient = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.eq]: datePedido
            }
        },
        // attributes: {
        //     include: [clientID] <------- se ligaaaa
        // }    
    })
    res.status(200).json({
        status: "Ok",
        data: pedidoClient
    })
}

const maisVendidoToDay = async (req, res) => {

    const maisVendido = await Pedidos.findAll({

    })
}

module.exports = {
    fitrarClientPorData
}