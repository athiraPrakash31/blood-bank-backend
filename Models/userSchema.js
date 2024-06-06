// Schema maos to a mongodb collection 

// import mongoose
const mongoose = require('mongoose')

// schema creation
const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:true
   }, 
    email:{
    type:String,
    required:true,
    unique:true
   },
    password:{
    type:String,
    required:true
   },
   role: {
      type: String,
      required:true,

   } ,
  
})

// 3 create model
const users = mongoose.model('users',userSchema)
module.exports = users