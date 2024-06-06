//  import userSchema or model
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
// Register logic
exports.register = async(req,res)=>{
    // accept data from client
    const {username,email,password,role} = req.body
    console.log(username,email,password,role);
    try{
        // check if the email is exist
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already exist")
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                role
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    }
    catch(error){
        res.status(500).json("Register failed...")
    }
}
// Login Logic

 // Adjust the path to your user model accordingly

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hard-coded admin credentials
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin123';

        let existingUser = await users.findOne({ email, password });

        if (existingUser) {
            let role = existingUser.role // Default role is 'user'
            
            // Check if the login is for the admin
            if (email === adminEmail && password === adminPassword) {
                role = 'admin';
            }

            const token = jwt.sign({ userId: existingUser._id, role: role }, "secretkey");
            console.log(token);

          res.status(200).json({
            message:role === 'admin' ? 'Admin Login Successful': 'User Login successful',
            user:existingUser,
            token
          });
        } else {
            res.status(404).json("Invalid email or password");
        }
    } catch (error) {
        res.status(500).json('Login failed: ' + error.message);
    }
};
