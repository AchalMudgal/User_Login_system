const detailsController = require("../controllers/details.controller");

module.exports = (app) =>{
    //Create details
    app.post("/loginSystem/api/v1/details", detailsController.createUserDetails);
    //Update details
    app.put("loginSystem/api/v1/details/:id", detailsController.update);
    //get user details
    app.post("/loginSystem/api/v1/one/details", detailsController.getOneTicket);
}