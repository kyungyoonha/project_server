const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");
const { getMyInfo, login } = require("./auth.ctrl");

router.get("/me", protect, getMyInfo);
router.post("/login", login);

module.exports = router;
