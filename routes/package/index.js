const express = require("express");
const router = express.Router();
const { getNationcode, nationcodeInsert } = require("./package.ctrl");
const { protect } = require("../../middlewares/auth");

// router.post("/", (req, res) => { res.send("package")});
router.get("/nationcode/:id", protect, getNationcode);
router.post("/nationcode/insert", protect, nationcodeInsert);

module.exports = router;
