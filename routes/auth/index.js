const express = require("express");
const router = express.Router();
const models = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
        const { id, password } = req.body;

        const user = await models.user.findOne({
            where: {
                id: id,
                pw: password,
            },
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "이메일과 비밀번호를 확인해주세요.",
            });
        }

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        const { username, email } = user;

        res.status(200).json({
            success: true,
            data: {
                username,
                email,
                token,
            },
        });
    } catch (e) {
        res.status(500);
    }
});
router.post("/signup", (req, res) => {
    res.send("auth");
});

module.exports = router;
