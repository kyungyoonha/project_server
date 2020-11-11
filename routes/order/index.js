const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");
const { getPurchase, purchasecodeInsert, getPruchasecode } = require("./order.ctrl");

// purchase 
router.get("/purchase", protect, getPurchase);
// purchase
router.get("/purchasecode", protect, getPruchasecode);
router.post("/purchasecode/insert", protect, purchasecodeInsert);

module.exports = router;
