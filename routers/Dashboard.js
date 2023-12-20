const express = require("express");
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProduct,
  registerAdmin,
  loginAdmin,
} = require("../models/Dashboard");

const router = express.Router();

router.get("/view", getProducts);
router.post("/add", addProducts);
router.put("/update/:id", updateProducts);
router.delete("/delete/:id", deleteProduct);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
