const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");
const { purchasecodeInsert } = require("./order.ctrl");

router.post("/purchasecode/insert", protect, purchasecodeInsert);

module.exports = router;
