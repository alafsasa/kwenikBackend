const db = require('../config/db.config');
const User = db.userdata;
const bcrypt = require('bcrypt');


//write a new user to DB
exports.signup = async (req, res) => {
    try{
        //
        const { email, password, town, country } = req.body;
        //create user
        //save user data to the db
        //encrypt password
        const encryptedPassword = await bcrypt.hashSync(password, 10);
        await User.create({
            email,
            password: encryptedPassword,
            town,
            country
        }).then(()=>{
            res.status(200).send("User registered successfully!");
        }).catch((error)=>{
            res.status(400).send({
                message: error.message
            })
        })

    }catch(err){
        res.status(500).send(err);
    }
};