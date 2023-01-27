const express = require('express');

const router = express.Router();

const Client = require('../database/models/clientModel');

router
.route('/')
.get( async (req, res) => { // GET clients
    
    const clients = await findAll();

    res.status(200).json({
        status: "Ok",
        data: clients
    })
})
.post( async (req, res) => { // POST create client
    const { name, email, tel } = req.body

    const client = await Client.create(req.body)

    res.status(201).json({
        status: "client created",
        data: client
    })
})

// router
// route('/:id')
// .get( async (req, res) =>{ // GET client por id
//     const clientId = req.params.id

//     const client = await findById(clientid);

//     res.status(200).json({
//         status: "Ok",
//         data: client
//     })
// })

// .patch( async(req, res) =>{ // PATCH update client por id
//     const clientId = req.params.id
//     const { fields } = req.body

//     const clientUpdated = await findByIdAndUpdate(clientId, fields)

//     res.status(204).json({
//         status: "client updated",
//         data: clientUpdated
//     })
// })

// .delete( async (req, res) => {
//     const clientId = req.params.id

//     await deleteById(clientId);

//     res.status(200).json({
//         status: "client removed"
//     })
// })

module.exports = router;