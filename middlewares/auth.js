const jwt = require("jsonwebtoken");
const model = require("../models");
exports.protect = async (req, res, next) => {
    // req.body.reguser = "master";
    // next();
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "로그인 해주세요." });
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await model.admin.findOne({
            where: { id: decoded.id },
        });

        req.user = admin;
        req.body.reguser = admin.username;
        req.body.moduser = admin.username;
        next();
    } catch (e) {}
};

// app에서 에러 받아서 message 이면 tostify 에러

exports.accessLevel = async (req, res, next) => {
    const level = req.user.level;
    if (level !== 1) {
        // 권한 없음 401 에러
        return res.status(401).json({ error: "슈퍼 관리자만 접근가능합니다." });
    }
    next();
};
