const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const paginate = require("express-paginate");
const { User, Driver, Admin, TriptagModel } = require("../../models");
const {
    getTypePath,
    getDatePath,
    makeWhereCondition,
} = require("../../utils/pathFunc");

exports.getUser = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await User.findAndCountAll({
            include: ["triptag", "drivercomplain", "purchase", "question"],
            offset: req.offset,
            limit,
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

exports.userInsert = async (req, res) => {
    try {
        const saveName = "profilename";
        const savePath = "profilepath";
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;

        // 아이디 체크
        const user = await User.findOne({ where: { id: inputs.id } });

        if (user)
            return res
                .status(403)
                .json({ error: "이미 가입한 아이디 입니다." });

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

        const newUser = await User.create(inputs);
        await newUser.save();

        // tripTag 테이블 추가
        const keys = Object.keys(inputs.tripTag);
        keys.forEach(async (key) => {
            if (inputs.tripTag[key]) {
                const newTripTag = await TriptagModel.create({
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

exports.getDriver = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Driver.findAndCountAll({
            include: ["trabus", "drivercomplain"],
            offset: req.offset,
            limit,
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

exports.driverInsert = async (req, res) => {
    try {
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;

        // 아이디 체크
        const driver = await Driver.findOne({
            where: { id: inputs.id },
        });

        if (driver)
            return res
                .status(403)
                .json({ error: "이미 가입한 아이디 입니다." });

        const imageList = ["driver", "car", "license"];
        imageList.forEach((item) => {
            if (req.files[item]) {
                let { originalname, mimetype, filename } = req.files[item][0];
                let typePath = getTypePath(mimetype);
                let datePath = getDatePath();
                inputs[item + "name"] = originalname;
                inputs[
                    item + "path"
                ] = `uploads/${typePath}/${datePath}/${filename}`;
            }
        });
        inputs.reguser = username;
        inputs.moduser = username;

        const newDriver = await Driver.create(inputs);
        newDriver.save();

        res.status(200).json(newDriver);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Admin.findAndCountAll({
            offset: req.offset,
            limit,
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

exports.adminInsert = async (req, res) => {
    try {
        // 유저 아이디 중복 체크
        const user = await Admin.findOne({ where: { id: req.body.id } });

        if (user)
            return res
                .status(403)
                .json({ error: "이미 가입한 아이디 입니다." });

        const newAdmin = await Admin.create(req.body);
        const salt = await bcrypt.genSalt(10);
        newAdmin.pw = await bcrypt.hash(newAdmin.pw, salt);
        await newAdmin.save();

        res.status(200).json(newAdmin);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.test = async (req, res) => {
    try {
        console.log("=======================");
        console.log(req.file);
        console.log("=======================");
        console.log(req.body);
        console.log("=======================");
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
