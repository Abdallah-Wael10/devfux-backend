const express = require('express');
const router = express.Router();
const controllers = require("../controllers/package.controller")
const verfiyToken = require("../middleware/verfiyToken")
router.route("/")
.get(verfiyToken,controllers.getALLPackage)
.post(verfiyToken,controllers.addPackage)

router.route("/:id")
.get(controllers.getOnePackage)
.delete(verfiyToken,controllers.deletePackage)
.patch(verfiyToken,controllers.updatePackage)

module.exports = router; 