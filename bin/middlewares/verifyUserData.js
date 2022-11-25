const db = require('../config/db.config');
const User = db.userdata;

//check if email exists
//check for duplicate email
const checkDuplicateUssernameEmail = async (req, res, next) => {
    const { email, password, town, country } = req.body;
    if(!email && password && town){
        res.status(400).send("Form fields cannot be empty");
        return;
    }
    //check if email exist
    //email the primary identifier
    await User.findOne({where: {email}}).then((user)=>{
        if(!user){
            next();
        }else{
            res.status(400).send({message: "Email already in use!"});
            return;
        }
    }).catch(error=>{
        res.status(500).send({message: error.message});
    });
}

const verifyUserData = {
    checkDuplicateUssernameEmail: checkDuplicateUssernameEmail
};

module.exports = verifyUserData;