const models = require("../../models");

exports.getNationcode = async (req, res) => {
    try {
        const nationcode = await models.nationcode.findOne({
            where: {
                idx: req.params.id,
            },
        });

        if (!nationcode) {
            res.status(200).json({}); // 응답은 성공 but 데이터는 없음
        }
        console.log(nationcode);
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
        res.status(500).json({ error: "Internal Server Error" });
    }
};
