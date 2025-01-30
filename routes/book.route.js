const express = require('express');
const router = express.Router();
const controllers = require("../controllers/book.controller")
const verfiy = require("../middleware/verfiyToken")

router.route("/")
.get(verfiy,controllers.getAllBook)
.post(controllers.createBook)

router.route("/:id")
.get(verfiy,controllers.getBook)
.delete(verfiy,controllers.deleteBook)
.patch(verfiy,controllers.updateBook)

module.exports = router; 