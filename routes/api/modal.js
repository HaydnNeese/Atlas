const router = require("express").Router();
const dbController = require("../../controllers/controller")
//const protectRoute = require("../../protect");

//This is getting our /api/modal/:id route
router.route("/:id")

    .get(dbController.findById)
    
// router.route("/post")
    .post(dbController.create)


module.exports = router;

