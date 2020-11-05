const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/multer");
const { protect } = require("../../middlewares/auth");
const {
    getNationcode,
    getNationcodeDetail,
    nationcodeInsert,
    getAreacode,
    getAreacodeDetail,
    areacodeInsert,
    areacodeUpdate,
} = require("./package.ctrl");


// router.post("/", (req, res) => { res.send("package")});
router.get("/nationcode", protect, getNationcode);
router.get("/nationcode/:id", protect, getNationcodeDetail);
router.post("/nationcode/insert", protect, nationcodeInsert);

router.get("/areacode", protect, getAreacode);
router.get("/areacode/:id", protect, getAreacodeDetail);
router.post("/areacode/insert", protect, upload.single("mainpic"), areacodeInsert );
router.post("/areacode/update", protect, upload.single("mainpic"), areacodeUpdate );
module.exports = router;

