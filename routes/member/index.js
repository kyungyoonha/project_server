const express = require("express");
const router = express.Router();
const { protect, accessLevel } = require("../../middlewares/auth");
//const Op = require("Sequelize").Op;
const { userInsert, driverInsert, adminInsert } = require("./member.ctrl");
const upload = require("../../middlewares/multer");

// admin
router.post("/user/insert", protect, upload.single("profile"), userInsert);
router.post("/admin/insert", protect, accessLevel, adminInsert);
router.post(
    "/driver/insert",
    protect,
    upload.fields([
        { name: "driver", maxCount: 1 },
        { name: "car", maxCount: 1 },
        { name: "license", maxCount: 1 },
    ]),
    driverInsert
);

module.exports = router;
