const models = require("../../models");
const bcrypt = require("bcryptjs");

exports.adminInsert = async (req, res) => {
    try {
        const user = await models.admin.findOne({
            where: { id: req.body.id },
        });

        if (user) {
            return res
                .status(403)
                .json({ error: "이미 존재하는 아이디 입니다." });
        }

        const newUser = await models.admin.create(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.pw = await bcrypt.hash(newUser.pw, salt);
        await newUser.save();

        res.status(200).json(newUser);
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error222" });
    }
};
