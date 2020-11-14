const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");
const { getPurchase, PurchaseInsert, PurchasetourInsert, purchasecodeInsert, getPruchasecode } = require("./order.ctrl");

// purchase 
router.get("/purchase", protect, getPurchase);
router.post("/purchase/insert", protect, PurchaseInsert)
router.post("/purchasetour/insert", protect, PurchasetourInsert)
// purchase
router.get("/purchasecode", protect, getPruchasecode);
router.post("/purchasecode/insert", protect, purchasecodeInsert);

module.exports = router;
