const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const app = express()
const usersRoutes = require("./routes/users")

const port = process.env.port || 3000

//middlewares
app.use(express.json())
app.use('/api/', usersRoutes)

//routes
app.get('/api', (req, res) =>{
    res.status(200).send('Server connected to DB in MongoDb Atlas');
})

//mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then (() => console.log('Connected to UsersDb in MongoDB Atlas'))
    .catch ((error) => console.error('Cannot connect to Db,  ' + error))

app.listen(port, (req, res) =>{
    console.log("Server running on port: " + port)
})