const express = require("express");
const {Router} = express;
const router = Router();
const productController = require("../controllers/productController");

router.post("/api/v1/products", productController.productPost);
router.get("/api/v1/products", productController.productGet);
router.get("/api/v1/products/:id", productController.productGetId);
router.put("/api/v1/products", productController.productPut);
router.put("/api/v1/products/:id", productController.productPutId);
router.delete("/api/v1/products", productController.productDelete);
router.delete("/api/v1/products/:id", productController.productDeleteId);

module.exports = router;
