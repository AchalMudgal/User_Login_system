const authController = require("../controllers/auth.controller");
const verifyUserReq = require("../middlewares/verifyUserRequest");

module.exports = (app) => {

    //SignUp 
    app.post("/loginSystem/api/v1/auth/signup",[verifyUserReq.signUpReqValidation], authController.signUp);

    //SignIn
    app.post("/loginSystem/api/v1/auth/signin", [verifyUserReq.signInReqBodyValidation], authController.signIn);
};
