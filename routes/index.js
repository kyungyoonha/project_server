const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/member", require("./member"));
router.use("/package", require("./package"));
router.use("/order", require("./order"));
router.use("/cs", require("./cs"));

module.exports = router;
