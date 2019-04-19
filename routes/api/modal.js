const router = require("express").Router();
const dbController = require("../../controllers/controller")

//This is getting our /api/modal/:id route
router.route("/:id")
    .get(dbController.findById)
    .post(dbController.create);

module.exports = router;