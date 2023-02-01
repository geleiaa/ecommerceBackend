const Pedidos = require('../database/models/pedidosModel');

const { Op } = require('sequelize');


const fitrarClientPorData = async (req, res) =>{
    
    const data = req.params.date;

    const clientDt = await Pedidos.findAll({
        where: {
            createdAt: {
                [Op.eq]: data
            }
        }
    })

    res.status(200).json({
        status: "Ok",
        data: clientDt
    })
}

module.exports = {
    fitrarClientPorData
}