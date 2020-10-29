const express = require("express");
const router = express.Router();
const models = require("../../models");
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

router.post("/user/insert", async (req, res) => {
    try {
        const user = await models.user.create(req.body);
        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

router.post("/admin/insert", async (req, res) => {
    try {
        const user = await models.admin.create(req.body);
        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
