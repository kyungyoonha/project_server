const express = require("express");
const router = express.Router();
const models = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
        const { id, password } = req.body;
        const admin = await models.admin.findOne({
            where: {
                id: id,
            },
        });

        if (!admin) {
            res.status(400).json({
                errors: { id: "일치하는 아이디가 없습니다." },
            });
        }

        const passwordCheck = await bcrypt.compare(password, admin.pw);
        console.log(passwordCheck);
        if (!passwordCheck) {
            res.status(400).json({
                errors: { password: "비밀번호가 일치하지 않습니다." },
            });
        }

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        const { username, email } = admin;

        res.status(200).json({
            username,
            email,
            token,
        });
    } catch (e) {
        res.status(500);
    }
});
router.post("/signup", (req, res) => {
    res.send("auth");
});

module.exports = router;
