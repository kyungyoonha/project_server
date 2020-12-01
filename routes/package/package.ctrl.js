const {
    Tour,
    Tourpicture,
    Touraudio,
    Nationcode,
    Areacode,
} = require("../../models");
const path = require("path");
const fs = require("fs");
const {
    getTypePath,
    getDatePath,
    makeWhereCondition,
} = require("../../utils/pathFunc");
const paginate = require("express-paginate");

exports.getTour = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Tour.findAndCountAll({
            include: [
                "trabus",
                "touraudio",
                "tourpicture",
                "purchase",
                "purchasetour",
            ],
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

exports.getTourDetail = async (req, res) => {};
exports.tourInsert = async (req, res) => {
    try {
        const fileAudios = req.files["audios"];
        const fileImages = req.files["images"];
        const inputs = JSON.parse(req.body.jsonData);
        const datePath = getDatePath();

        if (!inputs.images.length && !fileImages) {
            res.status(400).json({ error: "관광지 사진을 추가해주세요" });
        }

        if (!inputs.audios.length && !fileAudios) {
            res.status(400).json({ error: "오디오를 추가해주세요" });
        }

        const username = req.user.username;
        inputs.reguser = username;
        inputs.moduser = username;

        // [ Tour 저장 ]
        const newTour = await Tour.create(inputs);
        await newTour.save();

        // [ Images 저장 ]
        for (let idx = 0; idx < inputs.images.length; idx++) {
            const item = inputs.images[idx];
            const { originalname, mimetype, filename } = fileImages[idx];
            const typePath = getTypePath(mimetype);
            item.touridx = newTour.idx;
            item["filename"] = originalname;
            item["filepath"] = `uploads/${typePath}/${datePath}/${filename}`;
            item.reguser = username;
            item.moduser = username;

            const newTourpicture = await Tourpicture.create(item);
            await newTourpicture.save();
            console.log("image done");
        }

        // [ Audios 저장 ]
        for (let idx = 0; idx < inputs.audios.length; idx++) {
            const item = inputs.audios[idx];
            const { originalname, mimetype, filename } = fileImages[idx];
            const typePath = getTypePath(mimetype);

            item.touridx = newTour.idx;
            item.tourinx = newTour.idx; // ### ☆
            item["audiofilename"] = originalname;
            // item[
            //     "audiofilepath"
            // ] = `uploads/${typePath}/${datePath}/${filename}`;
            item["audiofilepath"] = `/${datePath}`;
            item.reguser = username;
            item.moduser = username;
            const newTouraudio = await Touraudio.create(item);

            await newTouraudio.save();
            console.log("audio done");
        }

        res.status(200).json(newTour);
    } catch (e) {
        console.log("-0-fewjfioejwioes");
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getNationcode = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Nationcode.findAndCountAll({
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

exports.getNationcodeDetail = async (req, res) => {
    try {
        const nationcode = await Nationcode.findOne({
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
        const newNationcode = await Nationcode.create(req.body);
        await newNationcode.save();
        res.status(200).json(newNationcode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAreacode = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Areacode.findAndCountAll({
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

exports.getAreacodeDetail = async (req, res) => {
    try {
        const areacode = await Areacode.findOne({
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
        const saveName = "mainpicname";
        const savePath = "mainpicpath";
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

        const newAreacode = await Areacode.create(inputs);
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
        const saveName = "mainpicname";
        const savePath = "mainpicpath";
        const inputs = JSON.parse(req.body.jsonData);
        const username = req.user.username;
        const areacode = await Areacode.findOne({
            where: { idx: inputs.idx },
        });

        // 파일 처리
        if (req.file && areacode[savePath]) {
            const { originalname, mimetype, filename } = req.file;
            const typePath = getTypePath(mimetype);
            const datePath = getDatePath();
            areacode.setDataValue(saveName, originalname);
            areacode.setDataValue(
                savePath,
                `uploads/${typePath}/${datePath}/${filename}`
            );
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
