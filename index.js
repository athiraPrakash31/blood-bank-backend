// 1.import env
require('dotenv').config()
//2 import express
const express = require('express')
//3 import cors
const cors = require('cors')

// 7 import db
const db = require('./DB/connection')

const router =require('./Routes/router')

//4 create a application using express
const bbServer = express()

// 5. use express, cors
bbServer.use(cors())
bbServer.use(express.json())
bbServer.use(router)

// port creation
const PORT = 4000 || process.env.PORT

bbServer.listen(PORT,()=>{
    console.log('bbServer lstening on port '+PORT);
})

bbServer.get('/',(req,res)=>{
    res.send("Welcome to Blood-Bank")
})