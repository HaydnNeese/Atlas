const router = require("express").Router();
const modalRoutes = require("./modal");

//Modal routes
router.use("/modal", modalRoutes);

module.exports = router;