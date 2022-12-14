const controller = require('../controllers/auth.controller');
const verifyUserData = require('../middlewares/verifyUserData');

module.exports = function(app){
    app.use(function(res, req, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            verifyUserData.checkDuplicateUssernameEmail
        ],
        controller.signup
    );
    app.post("/api/auth/login", controller.login);
}