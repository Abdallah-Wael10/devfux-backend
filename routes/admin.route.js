const express = require('express');
const router = express.Router();
const controller = require("../controllers/admin.controller")
const verfiyToken = require("../middleware/verfiyToken")

router.route("/")
.get(verfiyToken,controller.allUsers)
router.route("/:id")
.get(verfiyToken,controller.getuser)
.patch(verfiyToken,controller.updateUser)
.delete(verfiyToken,controller.deleteUser)

router.route("/register")
.post(controller.register)

router.route("/login")
.post(controller.login)

module.exports = router;