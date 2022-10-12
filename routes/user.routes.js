const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
    //Get user by id
    app.get("/loginSystem/api/v1/users/:id",[authJwt.verifyToken, authJwt.isValidUserIdInRequestParams],userController.findUsers);

    //Update user
    app.put("/loginSystem/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInRequestParams],userController.update);

    //get users by limit
    app.get("/loginSystem/api/v1/users/",[authJwt.verifyToken] ,userController.getUsersByLimit);

};
