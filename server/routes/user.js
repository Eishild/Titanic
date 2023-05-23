const express = require("express")
const { getAllPassengers, addUser, login } = require("../controllers/user")
const secureRoutePassengers = require("../middlewares/secureRoutePassengers")
const router = express.Router()

router.get("/getAllPassengers", secureRoutePassengers, getAllPassengers)
router.post("/signup", addUser)
router.post("/signin", login)

module.exports = router
