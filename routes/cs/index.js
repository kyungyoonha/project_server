const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

const { 
    getPush,
    getPushDetail,
    pushInsert,
    pushUpdate,
    getNotice,
    getNoticeDetail, 
    noticeInsert, 
    noticeUpdate, 
    getQuestion, 
    getQuestionDetail,
    questionInsert, 
    questionUpdate,
    sendEmail,
} = require('./cs.ctrl');

// Push
router.get('/push', protect, getPush);
router.get('/push/:id', protect, getPushDetail);
router.post('/push/insert', protect, pushInsert);
router.post('/push/update', protect, pushUpdate);


// Notice
router.get("/notice", protect, getNotice);
router.get("/notice/:id", protect, getNoticeDetail);
router.post("/notice/insert", protect, upload.single("file"), noticeInsert)
router.post("/notice/update", protect, upload.single("file"), noticeUpdate)

// Question
router.get("/question", protect, getQuestion);
router.get("/question/:id", protect, getQuestionDetail);
router.post("/question/insert", protect, upload.single("file"), questionInsert);
router.post("/question/update", protect, questionUpdate);

// Email
router.post("/email", protect, upload.single("file"), sendEmail);
module.exports = router;
