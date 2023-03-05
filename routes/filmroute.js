const router = require('express').Router();
const filmController = require("../controllers/filmcontroller")

module.exports = function () {
    router.get('/film/:filmname',filmController.getOMDb);

return router;
}