const models = require("../../models");
const bcrypt = require("bcryptjs");
const path = require("path");

exports.userInsert = async (req, res) => {
    try {
        const inputs = JSON.parse(req.body.jsonData);
        const filename = req.file.filename;
        const username = req.user.username;

        const user = await models.user.findOne({
            where: { id: inputs.id },
        });

        if (user) {
            return res
                .status(403)
                .json({ error: "이미 가입한 아이디 입니다." });
        }

        inputs.profilename = filename;
        inputs.profilepath = path.join(`/uploads/image/${filename}`);
        inputs.reguser = username;
        inputs.moduser = username;
        // 저장시 => /uploads/image/file.jpg ?
        // 저장시 => http://localhost:8000/uploads/image/file.jpg
        const newUser = await models.user.create(inputs);
        newUser.save();

        const keys = Object.keys(inputs.tripTag);
        keys.forEach(async (key) => {
            if (inputs.tripTag[key]) {
                const newTripTag = await models.triptag.create({
                    useridx: newUser.idx,
                    tag: key,
                    reguser: username,
                    moduser: username,
                });

                await newTripTag.save();
            }
        });

        res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.driverInsert = async (req, res) => {
    try {
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;
        const driver = await models.driver.findOne({
            where: { id: inputs.id },
        });

        if (driver) {
            return res.status(403).json({
                error: "이미 가입한 아이디 입니다.",
            });
        }

        const imageList = ["driver", "car", "license"];
        let filename;
        imageList.forEach((item) => {
            if (req.files[item]) {
                filename = req.files[item][0].filename;
                inputs[item + "name"] = filename;
                inputs[item + "path"] = `/uploads/image/${filename}`;
            }
        });
        inputs.reguser = username;
        inputs.moduser = username;

        const newDriver = await models.driver.create(inputs);
        newDriver.save();

        res.status(200).json(newDriver);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.adminInsert = async (req, res) => {
    try {
        const user = await models.admin.findOne({
            where: { id: req.body.id },
        });

        if (user) {
            return res
                .status(403)
                .json({ error: "이미 가입한 아이디 입니다." });
        }

        const newAdmin = await models.admin.create(req.body);
        const salt = await bcrypt.genSalt(10);
        newAdmin.pw = await bcrypt.hash(newAdmin.pw, salt);
        await newAdmin.save();

        res.status(200).json(newAdmin);
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
