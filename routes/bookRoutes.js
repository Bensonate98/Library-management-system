const express = require("express");
const {Router} = express;
const router = Router();
const bookController = require("../controllers/bookController");

router.post("/api/v1/books", bookController.addNewBook);
router.get("/api/v1/books", bookController.retrieveBooks);
router.get("/api/v1/books/:id", bookController.retrieveOneBook);
router.patch("/api/v1/books/:id/update", bookController.updateBook);
router.delete("/api/v1/books/:id/delete", bookController.deleteBook);

module.exports = router;
