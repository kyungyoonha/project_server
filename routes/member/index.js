const express = require("express");
const router = express.Router();
const models = require("../../models");
const bcrypt = require("bcryptjs");
const { protect } = require("../../middlewares/auth");

const Op = require("Sequelize").Op;

// router.post("/user", async (req, res) => {
//     const { pageSize, currentPage, search } = req.body;

//     const users = await models.user.findAll({
//         where: {
//             [Op.or]: [
//                 { username: { [Op.like]: `%${search}%` } },
//                 { nickname: { [Op.like]: `%${search}%` } },
//                 { relnumber: { [Op.like]: `%${search}%` } },
//             ],
//         },
//     });
//     res.json(users);
// });

// router.post("/user/insert", async (req, res) => {
//     try {
//         const user = await models.user.create(req.body);
//         res.json(user);
//     } catch (e) {
//         console.log(e);
//     }
// });

router.post("/admin/insert", protect, async (req, res) => {
    try {
        console.log(req.body.id);
        const user = await models.admin.findOne({
            where: { id: req.body.id },
        });

        if (user) {
            res.status(403).json({
                errors: { id: "이미 존재하는 아이디 입니다." },
            });
        }
        const newUser = await models.admin.create(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.pw = await bcrypt.hash(newUser.pw, salt);
        await newUser.save();

        res.status(200).json(newUser);
    } catch (e) {
        res.status(500).json({
            errors: { message: "Internal Server Error222" },
        });
    }
});

module.exports = router;
