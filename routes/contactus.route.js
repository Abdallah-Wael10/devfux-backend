const express = require('express');
const router = express.Router();
const controllers = require("../controllers/contactus.controller")
const verfiy = require("../middleware/verfiyToken")
router.route("/")
.get(verfiy,controllers.allContact)
.post(controllers.createContact)

router.route("/:id")
.get(verfiy,controllers.oneContact)
.delete(verfiy,controllers.deleteContact)
.patch(verfiy,controllers.updateContact)

module.exports = router; 