const router = require("express").Router();
const dbController = require("../../controllers/controller")
const protectedRoute = require("../../protect");

//This is getting our /api/modal/:id route
router.route("/:id")
    .get(protectedRoute, dbController.findById)
    .post(protectedRoute, dbController.create);

module.exports = router;