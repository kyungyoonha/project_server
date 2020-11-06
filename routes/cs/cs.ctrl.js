const models = require("../../models");
const path = require("path");
const fs = require('fs');
const { getTypePath, getDatePath }  = require('../../utils/pathFunc')
var nodemailer = require('nodemailer');

exports.getNotice = async (req, res) => {
    try{
        const notice = await models.notice.findAll();
        res.status(200).json(notice);

    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
} 
exports.getNoticeDetail = async (req, res) => {
    try{
        const notice = await models.notice.findOne({
            where: {
                idx: req.params.id,
            },
        });

        if (!notice) {
            res.status(200).json({}); // 응답은 성공 but 데이터는 없음
        }
        
        notice.setDataValue("file", "");
        res.status(200).json(notice);
    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.noticeInsert = async (req, res) => {
    try{
        const saveName = 'filename';
        const savePath = 'filepath';
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;
        
        // 파일 처리
        if(req.file){
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            inputs[saveName] = originalname
            inputs[savePath] = `uploads/${typePath}/${datePath}/${filename}`;
        }
        inputs.reguser = username;
        inputs.moduser = username;

        const newNotice = await models.notice.create(inputs);
        await newNotice.save()
        res.status(200).json(newNotice);

    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 업데이트
exports.noticeUpdate = async (req, res) => {
    try{
        const saveName = 'filename';
        const savePath = 'filepath';
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;
        const notice = await models.notice.findOne({
            where: { idx: inputs.idx }
        })

        // 파일 처리
        if (req.file && notice[savePath]) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            notice.setDataValue(saveName, originalname);
            notice.setDataValue(savePath, `uploads/${typePath}/${datePath}/${filename}`);
            
            // 기존 파일 삭제
            fs.unlinkSync(path.join(__dirname, `../../${notice[savePath]}`));
        }

        notice.setDataValue("moduser", username);
        await notice.save();

        res.status(200).json(notice);
    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getQuestion = async (req, res) => {
    try{
        const question = await models.question.findAll();
        res.status(200).json(question);

    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }

}
exports.getQuestionDetail = async (req, res) => {
    try{
        const question = await models.question.findOne({
            where: {
                idx: req.params.id,
            },
        });

        if (!question) {
            res.status(200).json({}); // 응답은 성공 but 데이터는 없음
        }
        
        question.setDataValue("mainpic", "");
        res.status(200).json(question);
    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.questionInsert = async (req, res) => {
    try{
        const saveName = 'filename';
        const savePath = 'filepath';
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;

        // 파일 처리
        if(req.file){
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            inputs[saveName] = originalname
            inputs[savePath] = `uploads/${typePath}/${datePath}/${filename}`;
        }
        inputs.reguser = username;
        inputs.moduser = username;

        const newQuestion = await models.question.create(inputs);
        await newQuestion.save();
        res.status(200).json(newQuestion);
    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.questionUpdate = async (req, res) => {
    try{
        const question = await models.question.findOne({
            where: {
                idx: req.body.idx
            }
        })
        question.setDataValue("replyYN", "Y")
    }catch(e){
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.sendEmail = async (req, res) => {
    try{
        const inputs = JSON.parse(req.body.jsonData);
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PW,
            }
        })
        
        let mailOptions = {
            from: '트립소다 <ruddbsqkend@gmail.com>',
            to: inputs.to,
            subject: inputs.subject,
            html: `<h1>트립소다</h1><p>${inputs.contents}</p>`,
        }

        if(req.file){
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            const uploaddir = path.join(__dirname, `../../uploads/${typePath}/${datePath}/${filename}`)
            mailOptions.attachments = [
                {
                    filename: originalname,
                    content: await fs.promises.readFile(uploaddir)
                }
            ]
        }
        smtpTransport.sendMail(mailOptions, (e, response)=>{

            if(e){
                console.log(e)
                res.status(500).json({ error: "fail to send email: " + e.message})
            }else{
                console.log('Message sent Successfully' + response.message)
                res.status(200).json({})
            }
        })

    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Internal Server Error"});
    }
}