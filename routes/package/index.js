const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/multer");
const { protect } = require("../../middlewares/auth");
const {
    getTour,
    getTourDetail,
    tourInsert,
    getNationcode,
    getNationcodeDetail,
    nationcodeInsert,
    getAreacode,
    getAreacodeDetail,
    areacodeInsert,
    areacodeUpdate,
} = require("./package.ctrl");

router.get("/tour", protect, getTour);
router.get("/tour/:id", protect, getTourDetail);
router.post("/tour/insert", protect, tourInsert)
// nationcode
router.get("/nationcode", protect, getNationcode);
router.get("/nationcode/:id", protect, getNationcodeDetail);
router.post("/nationcode/insert", protect, nationcodeInsert);
// areacode
router.get("/areacode", protect, getAreacode);
router.get("/areacode/:id", protect, getAreacodeDetail);
router.post("/areacode/insert", protect, upload.single("mainpic"), areacodeInsert );
router.post("/areacode/update", protect, upload.single("mainpic"), areacodeUpdate );
module.exports = router;

