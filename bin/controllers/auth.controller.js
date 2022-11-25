const db = require('../config/db.config');
const User = db.userdata;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//write a new user to DB
exports.signup = async (req, res) => {
    try{
        //register user
        const { email, password, town, country } = req.body;
        //create user
        //save user data to the db
        //encrypt password
        const encryptedPassword = await bcrypt.hashSync(password, 10);
        const formartEmail = email.toLowerCase();
        await User.create({
            email: formartEmail,
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

//login user
exports.login = async (req, res) => {
    try{
        //login user
        const { email, password } = req.body;
        //check for empty fields
        if(! (email && password)){
            res.status(400).send("Form fields cannot be empty!");
            return;
        }
        //check if user exist
        //chek if email provided has a user
        await User.findOne({where: {email: email}}).then((user)=>{
            if(!user){
                res.status(400).send("Account does not Exist!");
            }else{
                //account exist
                const passwordIsValid = bcrypt.compareSync(password, user.password);
                if(!passwordIsValid){
                    res.status(401).send("Wrong Email or Password, try again!");
                }else{
                    //every is good, now authenticate
                    const tokenize = jwt.sign({email: user.email}, '0hCAnpCIcsDgRku5l8zCv1jnlZFXy8gCNC/4O/zlW9M=', {expiresIn: 86400});
                    //return result
                    res.status(200).send({
                        token: tokenize
                    })
                }
            }
        }).catch((error)=>res.status(401).send({message: error.message}));
    }catch(err){
        res.status(500).send(err);
    }
};