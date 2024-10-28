const express = require("express");
const {Router} = express;
const router = Router();
const bookController = require("../controllers/bookController");

router.post("/api/v1/books", bookController.addNewBook);
router.get("/api/v1/books", bookController.retrieveBook);
router.patch("/api/v1/books", bookController.updateBook);
router.delete("/api/v1/books", bookController.deleteBook);

module.exports = router;
