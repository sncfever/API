const router = require('express').Router();
const userController = require("../controllers/usercontroller")

module.exports = function () {
   router.get('/user/',userController.auth);
   
return router;
}