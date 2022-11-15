const db = require('../config/db.config');
const User = db.userdata;
const bcrypt = require('bcrypt');


//write a new user to DB
exports.signup = async (req, res) => {
    try{
        //
        const { userbios } = req.body;
        console.log(userbios.email)
        console.log(userbios.password);
        console.log(userbios.town);
        //console.log(userbios.country)

    }catch(err){
        res.status(400).send(err);
    }
};