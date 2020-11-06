const models = require("../../models");
const path = require("path");
const fs = require('fs');
const { getTypePath, getDatePath } = require('../../utils/pathFunc');

exports.getNationcode = async (req, res) => {
    try {
        const nationcode = await models.nationcode.findAll();
        res.status(200).json(nationcode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getNationcodeDetail = async (req, res) => {
    try {
        const nationcode = await models.nationcode.findOne({
            where: {
                idx: req.params.id,
            },
        });

        if (!nationcode) {
            res.status(200).json({}); // 응답은 성공 but 데이터는 없음
        }
        res.status(200).json(nationcode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.nationcodeInsert = async (req, res) => {
    try {
        const newNationcode = await models.nationcode.create(req.body);
        await newNationcode.save();
        res.status(200).json(newNationcode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAreacode = async (req, res) => {
    try {
        const areacode = await models.areacode.findAll();
        res.status(200).json(areacode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAreacodeDetail = async (req, res) => {
    try {
        const areacode = await models.areacode.findOne({
            where: {
                idx: req.params.id,
            },
        });

        if (!areacode) {
            res.status(200).json({}); // 응답은 성공 but 데이터는 없음
        }
        
        areacode.setDataValue("mainpic", "");
        res.status(200).json(areacode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.areacodeInsert = async (req, res) => {
    try {
        const saveName = 'mainpicname';
        const savePath = 'mainpicpath';
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

        const newAreacode = await models.areacode.create(inputs);
        await newAreacode.save();
        res.status(200).json(newAreacode);

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 업데이트
exports.areacodeUpdate = async (req, res) => {
    try {
        const saveName = 'mainpicname';
        const savePath = 'mainpicpath';
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;
        const areacode = await models.areacode.findOne({
            where: { idx: inputs.idx }
        })

        // 파일 처리
        if (req.file && areacode[savePath]) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            areacode.setDataValue(saveName, originalname);
            areacode.setDataValue(savePath, `uploads/${typePath}/${datePath}/${filename}`);
            // 기존 파일 삭제
            fs.unlinkSync(path.join(__dirname, `../../${areacode[savePath]}`));
        }
        
        areacode.setDataValue("moduser", username);
        await areacode.save();

        res.status(200).json(areacode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};