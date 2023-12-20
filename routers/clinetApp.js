const express = require("express");
const router = express.Router();

const { getProducts, orders } = require("../models/clinetApp");

router.get("/view", getProducts);

module.exports = router;
