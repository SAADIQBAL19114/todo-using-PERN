const express = require('express')
const {sequelize,todo,users} = require('./sequelize/models')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
const cors = require ('cors')


const app = express()
app.use(express.json())
app.use(cors())


// Routers defining 

app.use('/todos',todoRouter )
app.use('/users',userRouter)
// users apis




app.listen({port:5001}, async () => {
    console.log("server up on http://localhost:5001");
    await sequelize.authenticate()
    console.log("DataBase is Connected");
})



