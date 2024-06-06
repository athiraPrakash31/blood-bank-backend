// import express
const express  = require('express')

const userController = require ('../Controllers/userController')
const jwtMiddleware = require ('../Middlewares/jwtMiddleware')
const patientController = require('../Controllers/patientController')
// create router object of express to define path
const router = express.Router()

// register api
router.post('/register',userController.register)
router.post('/login',userController.login)
// Recipients crud operations
router.post('/add-recipient',jwtMiddleware,patientController.addRecipient)
router.get('/view-recipient',jwtMiddleware,patientController.viewRecipient)
router.get('/allRecipient',patientController.allRecipients)
router.delete('/recipient/delete/:pid',jwtMiddleware,patientController.deletePatient)
router.put('/update-recipient/:pid',jwtMiddleware,patientController.updateRecipient)
router.get('/viewRecipient/:id',jwtMiddleware,patientController.viewRecipient)
// Donors crud operations
router.post('/add-donor',jwtMiddleware,patientController.addDonor)
router.get('/viewDonor/:id',jwtMiddleware,patientController.viewDonor)
router.get("/allDonors",patientController.allDonors)
router.delete('/donor/delete/:pid',jwtMiddleware,patientController.deleteDonor)
router.put("/update-donor/:pid",jwtMiddleware,patientController.updateDonor)
module.exports = router