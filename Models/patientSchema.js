const mongoose = require("mongoose")
const patientSchema = new mongoose.Schema({
   
    fullName:{
        type:String,
        required:true
    },
    bloodType:{
        type:String,
        required:true 
    },
    phoneNumber:{
        type:String,
        required:true
    },
    
    userId:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    }
})
const patients = mongoose.model('Patients',patientSchema)
module.exports = patients