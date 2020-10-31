const express = require("express");
const router = express.Router();
const { protect, accessLevel } = require("../../middlewares/auth");
//const Op = require("Sequelize").Op;
const { adminInsert } = require("./member.ctrl");

// admin
router.post("/admin/insert", protect, accessLevel, adminInsert);

module.exports = router;
