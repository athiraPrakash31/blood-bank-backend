const patients = require('../Models/patientSchema')

exports.addRecipient = async(req,res) =>{
    console.log(req.body);
    const {fullName,bloodType,phoneNumber,role} = req.body;
    const userId = req.payload
    if (!fullName || !bloodType || !phoneNumber ||!role) {
        return res.status(400).json("Please provide fullName, bloodType, and phoneNumber.");
    }
    console.log(fullName,bloodType,phoneNumber,role);
    console.log(userId);
    try{
        console.log("log1");
        const existingRecipient = await patients.findOne({phoneNumber})
        console.log(existingRecipient);
        if(existingRecipient){
            res.status(406).json("Patient already exist")
        }
        else{
            const newPatient = new patients({
                userId,
                fullName,
                bloodType,
                phoneNumber,
                role
            })
            await newPatient.save()
            res.status(200).json(newPatient)
        }
    }
    catch(err){
        res.status(500).json("Recipient adding failed... " + err)
    }
}

exports.addDonor = async(req,res) =>{
    console.log(req.body);
    const {fullName,bloodType,phoneNumber,role} = req.body;
    const userId = req.payload
    if (!fullName || !bloodType || !phoneNumber || !role) {
        return res.status(400).json("Please provide fullName, bloodType, and phoneNumber.");
    }
    console.log(fullName,bloodType,phoneNumber,role);
    console.log(userId);
    try{
        console.log("log1");
        const existingDonor = await patients.findOne({phoneNumber})
        console.log(existingDonor);
        if(existingDonor){
            res.status(401).json("Patient already exist")
        }
        else{
            const newDonor = new patients({
                userId,
                fullName,
                bloodType,
                phoneNumber,
                role
            })
            await newDonor.save()
            res.status(200).json(newDonor)
        }
    }
    catch(err){
        res.status(500).json("Donor adding failed... " + err)
    }
}

exports.allRecipients = async(req,res)=>{
    const searchKey=req.query.search
    console.log(searchKey);
    let query={}
    if(searchKey){
        query.fullName = {$regex:searchKey,$options:"i"}
    }
    try{
        const allRecipients = await patients.find(query)
        console.log(allRecipients);
        if(allRecipients.length>0){
            res.status(200).json(allRecipients)
        }
        else{
            res.status(402).json("No Recipients found")
        }
    }
    catch(err){
        res.status(500).json("No existed Recipents" +err)
    }
}

exports.allDonors = async(req,res)=>{
    const searchKey=req.query.search
    console.log(searchKey);
    let query={}
    if(searchKey){
        query.fullName = {$regex:searchKey,$options:"i"}
    }
    try{
        const allDonors = await patients.find(query)
        console.log(allDonors);
        if(allDonors){
            res.status(200).json(allDonors)
        }
        else{
            res.status(407).json("No Donors found")
        }
    }
    catch(err){
        res.status(500).json("No existed Donor" +err)
    }
}
exports.viewRecipient =async(req,res)=>{
    const userId = req.params.id
    console.log(userId);
    try{
        const viewRecipient = await patients.find({userId})
        if(viewRecipient){
            res.status(200).json(viewRecipient)
        }
        else{
            res.status(403).json("Recipient not found")

        }
    }
    catch(err){
        res.status(500).json("View Recipient Failed")

    }
}
exports.viewDonor =async(req,res)=>{
    const userId = req.params.id
    console.log(userId);
    try{
        const viewDonor = await patients.find({userId})
        if(viewDonor){
            res.status(200).json(viewDonor)
        }
        else{
            res.status(405).json("Donor not found")

        }
    }
    catch(err){
        res.status(500).json("View Donor Failed")

    }
}


exports.updateRecipient = async (req,res)=>{
    const {fullName,bloodType,phoneNumber} = req.body;
    userId = req.payload
    const {pid} = req.params
    try{
        const updateDetails = await patients.findByIdAndUpdate({_id:pid},{fullName,bloodType,phoneNumber})
        await updateDetails.save()
        res.status(200).json(updateDetails)
    }
    catch(err){
        res.status(401).json({ message: err.message })
  
    }
}

exports.updateDonor = async (req,res)=>{
    const {fullName,bloodType,phoneNumber} = req.body;
    userId = req.payload
    const {pid} = req.params
    try{
        const updateDonorDetails = await patients.findByIdAndUpdate({_id:pid},{fullName,bloodType,phoneNumber})
        await updateDonorDetails.save()
        res.status(200).json(updateDonorDetails)
    }
    catch(err){
        res.status(401).json({ message: err.message })
  
    }
}


exports.deletePatient = async (req,res)=>{
    const {pid} = req.params
    try{
        const deletePatient = await patients.findOneAndDelete({_id:pid})
        res.status(200).json(deletePatient)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}
exports.deleteDonor = async (req,res)=>{
    const {pid} = req.params
    try{
        const deleteDonor = await patients.findOneAndDelete({_id:pid})
        res.status(200).json(deleteDonor)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}
