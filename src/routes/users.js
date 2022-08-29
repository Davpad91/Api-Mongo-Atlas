const express = require('express')
const { find } = require('../models/users')
const router = express.Router()
const userSchema = require("../models/users")

//create user
router.post('/users', (req, res) =>{
    const user = userSchema(req.body)
    user.save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(400).json({message:`Can't be created, error: ` + error}))
})

//get all users
router.get('/users', (req, res) =>{
    userSchema
        .find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).send({message: error}))
})

//get a user
router.get('/users/:id', (req, res) => {
    const { id } = req.params
    const user = req.params
    userSchema
        .findById(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({message: error}))
})

//update a user
router.put('/users/:id', (req, res) =>{
    const { id } = req.params
    const { name, lastname, password } = req.body 
    userSchema
        .updateOne({_id: id}, { $set: {name, lastname, password}})
        .then((data) => res.status(200).send(`The user with ${id} updated`))
        .catch((error) => res.status(400).json({message: error}))
})

//delete a user
router.delete('/users/:id', (req, res) =>{
    const { id } = req.params 
    userSchema
        .remove({_id: id})
        .then((data) => res.status(200).send(`The user with ${id} updated`))
        .catch((error) => res.json({message: error}))
})

module.exports = router