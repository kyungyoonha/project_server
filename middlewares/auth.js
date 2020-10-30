const jwt = require("jsonwebtoken");
const model = require("../models");
exports.protect = async (req, res, next) => {
    req.body.reguser = "master";
    next();
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "로그인 해주세요." });
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await model.admin.findOne({
            attributes: ["username"],
            where: { id: decoded.id },
        });

        req.body.reguser = user.username;

        next();
    } catch (e) {}
};
