const sequelize = require('sequelize');
const { Op } = require('sequelize');

const Client = require('../database/models/clientModel');

const getTodosClientes = async (req, res) => { // GET clientes
    
    const clients = await Client.findAll();

    res.status(200).json({
        status: "Ok",
        data: clients
    })
}


const criarCliente = async (req, res) => { // POST create cliente
    const name = req.body.name;
    const email = req.body.email;
    const tel = req.body.tel;

    const client = await Client.create({ name, email, tel })

    res.status(201).json({
        status: "cliente criado",
        data: client
    })
}


const getOneCliente = async (req, res) =>{ // GET cliente por id
    const clientId = req.params.id

    const client = await Client.findOne({
        where: {
            id: clientId
        }
    })

    res.status(200).json({
        status: "Ok",
        data: client
    })
}


const atualizarCliente = async(req, res) =>{ // PATCH update cliente por id
    const clientId = req.params.id
    const { fields } = req.body

    const clientUpdated = await findByIdAndUpdate({fields}, {where: clientId})

    res.status(204).json({
        status: "client updated",
        data: clientUpdated
    })
}

const deleteCliente = async (req, res) => {
    const clientId = req.params.id

    await destroy({where: clientId});

    res.status(200).json({
        status: "client removed"
    })
}

module.exports = {
    getTodosClientes,
    getOneCliente,
    criarCliente,
    atualizarCliente,
    deleteCliente
}