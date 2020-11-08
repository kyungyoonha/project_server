const express = require("express");
const router = express.Router();
const { protect, accessLevel } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");
const { 
    getUser, 
    userInsert, 
    getDriver, 
    driverInsert, 
    getAdmin, 
    adminInsert 
} = require("./member.ctrl");

const uploadFields = [ 
    { name: "driver", maxCount: 1 }, 
    { name: "car", maxCount: 1 }, 
    { name: "license", maxCount: 1 } 
]

// User
router.get("/user", getUser);
router.post("/user/insert", protect, upload.single("profile"), userInsert);
// Driver
router.get("/driver", protect, getDriver);
router.post("/driver/insert", protect, upload.fields(uploadFields), driverInsert);
// Admin
router.get("/admin", protect, getAdmin);
router.post("/admin/insert", protect, accessLevel, adminInsert);
module.exports = router;
