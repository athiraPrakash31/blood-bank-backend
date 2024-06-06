const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware");
    try{
        const token = req.headers['authorization'].slice(7)
        console.log(token);
        const jwtVerification = jwt.verify(token,'secretkey')
        console.log(jwtVerification);
        req.payload = jwtVerification.userId
        console.log(req.payload);
        next()
    }
    catch(error){
        res.status(401).json({"AuthorizationError":error.message})
    }
}

module.exports = jwtMiddleware