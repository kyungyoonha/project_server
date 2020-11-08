const { Admin } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getMyInfo = async (req, res) => {
    try {
        const { username, email } = req.user;
        res.status(200).json({
            user: {
                username,
                email,
            },
        });
    } catch (e) {
        res.status(500).json({
            error: "로그인 유저 정보를 가져올 수 없습니다.",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { id, pw } = req.body;
        const admin = await Admin.findOne({
            where: {
                id: id,
            },
        });

        if (!admin) {
            res.status(400).json({
                error: "일치하는 아이디가 없습니다.",
            });
        }

        const passwordCheck = await bcrypt.compare(pw, admin.pw);
        if (!passwordCheck) {
            res.status(400).json({
                error: "비밀번호가 일치하지 않습니다.",
            });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({ error: "로그인 할 수 없습니다." });
    }
};
