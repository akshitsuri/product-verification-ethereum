const express = require("express");
const { addProduct, removeProduct } = require("../controllers/product");

const router = express.Router();

const { protect } = require("../middleware/auth");

//add product to array
router.put("/add-product", protect, addProduct);

//remove product from array
router.put("/remove-product", protect, removeProduct);

module.exports = router;
