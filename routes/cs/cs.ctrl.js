const { Push, Notice, Question } = require("../../models");
const path = require("path");
const fs = require("fs");
const { getTypePath, getDatePath } = require("../../utils/pathFunc");
var nodemailer = require("nodemailer");
const paginate = require("express-paginate");

exports.getPush = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Push.findAndCountAll({
            limit,
            offset: req.offset,
            where,
        });
        const pageCount = Math.ceil(results.count / limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            page
        );
        res.status(200).json({ pageCount, pages, data: results.rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getPushDetail = async (req, res) => {
    try {
        const push = await Push.findOne({ where: { idx: req.params.id } });
        if (!push) return res.status(200).json({});

        res.status(200).json(push);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.pushInsert = async (req, res) => {
    try {
        const newPush = await Push.create(req.body);
        await newPush.save();
        res.status(200).json(newPush);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// ### 작업중
exports.pushUpdate = async (req, res) => {
    try {
        const moduser = req.user.username;
        const data = { ...req.body, moduser };
        await Push.update(data, { where: { idx: data.idx } });
        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getNotice = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Notice.findAndCountAll({
            limit,
            offset: req.offset,
            where,
        });
        const pageCount = Math.ceil(results.count / limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            page
        );
        res.status(200).json({ pageCount, pages, data: results.rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getNoticeDetail = async (req, res) => {
    try {
        const notice = await Notice.findOne({ where: { idx: req.params.id } });
        if (!notice) return res.status(200).json({}); // 응답은 성공 but 데이터는 없음

        notice.setDataValue("file", "");
        res.status(200).json(notice);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.noticeInsert = async (req, res) => {
    try {
        const saveName = "filename";
        const savePath = "filepath";
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;

        // 파일 처리
        if (req.file) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            inputs[saveName] = originalname;
            inputs[savePath] = `uploads/${typePath}/${datePath}/${filename}`;
        }
        inputs.reguser = username;
        inputs.moduser = username;

        const newNotice = await Notice.create(inputs);
        await newNotice.save();
        res.status(200).json(newNotice);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 업데이트
exports.noticeUpdate = async (req, res) => {
    try {
        const saveName = "filename";
        const savePath = "filepath";
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;
        const notice = await Notice.findOne({
            where: { idx: inputs.idx },
        });

        // 파일 처리
        if (req.file && notice[savePath]) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();

            inputs[saveName] = originalname;
            inputs[savePath] = `uploads/${typePath}/${datePath}/${filename}`;

            // 기존 파일 삭제
            fs.unlinkSync(path.join(__dirname, `../../${notice[savePath]}`));
        }
        inputs.moduser = username;

        await Notice.update(inputs, { where: { idx: inputs.idx } });
        res.status(200).json(notice);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getQuestion = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Question.findAndCountAll({
            limit,
            offset: req.offset,
            where,
        });
        const pageCount = Math.ceil(results.count / limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            page
        );
        res.status(200).json({ pageCount, pages, data: results.rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getQuestionDetail = async (req, res) => {
    try {
        const question = await Question.findOne({
            where: { idx: req.params.id },
        });
        if (!question) return res.status(200).json({}); // 응답은 성공 but 데이터는 없음

        question.setDataValue("mainpic", "");
        res.status(200).json(question);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.questionInsert = async (req, res) => {
    try {
        const saveName = "filename";
        const savePath = "filepath";
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;

        // 파일 처리
        if (req.file) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            inputs[saveName] = originalname;
            inputs[savePath] = `uploads/${typePath}/${datePath}/${filename}`;
        }
        inputs.reguser = username;
        inputs.moduser = username;

        const newQuestion = await Question.create(inputs);
        await newQuestion.save();
        res.status(200).json(newQuestion);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.questionUpdate = async (req, res) => {
    try {
        const moduser = req.user.username;
        const data = {
            ...req.body,
            replyYN: "Y",
            moduser,
        };
        await Question.update(data, { where: { idx: data.idx } });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.sendEmail = async (req, res) => {
    try {
        const inputs = JSON.parse(req.body.jsonData);
        const smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PW,
            },
        });

        let mailOptions = {
            from: "트립소다 <ruddbsqkend@gmail.com>",
            to: inputs.to,
            subject: inputs.subject,
            html: `<h1>트립소다</h1><p>${inputs.contents}</p>`,
        };

        if (req.file) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            const uploaddir = path.join(
                __dirname,
                `../../uploads/${typePath}/${datePath}/${filename}`
            );
            mailOptions.attachments = [
                {
                    filename: originalname,
                    content: await fs.promises.readFile(uploaddir),
                },
            ];
        }
        smtpTransport.sendMail(mailOptions, (e, response) => {
            if (e) {
                console.log(e);
                res.status(500).json({
                    error: "fail to send email: " + e.message,
                });
            } else {
                console.log("Message sent Successfully" + response.message);
                res.status(200).json({});
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
