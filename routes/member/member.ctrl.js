const models = require("../../models");
const bcrypt = require("bcryptjs");

exports.userInsert = async (req, res) => {
    try {
        const inputs = JSON.parse(req.body.jsonData);
        
        // 파일 처리
        if(req.file){
            const filename = req.file.filename;
            const username = req.user.username;
            inputs.profilename = filename.split('.')[0];
            inputs.profilepath = `uploads/image/${filename}`;
            inputs.reguser = username;
            inputs.moduser = username;
        }

        const user = await models.user.findOne({
            where: { id: inputs.id },
        });

        // 아이디 체크
        if (!user) {
            return res
                .status(403)
                .json({ error: "이미 가입한 아이디 입니다." });
        }
        
        const newUser = await models.user.create(inputs);
        await newUser.save();

        // tripTag 테이블 추가
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
                inputs[item + "path"] = `uploads/image/${filename}`;
            }
        });
        inputs.reguser = username;
        inputs.moduser = username;

        const newDriver = await models.driver.create(inputs);
        newDriver.save();

        res.status(200).json(newDriver);
    } catch (e) {
        console.log(e);
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
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
