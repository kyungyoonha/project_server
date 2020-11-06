const fs = require("fs");
const path = require("path");
const { getTypePath, getDatePath } = require("../utils/pathFunc");

//multer 셋팅
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const typePath = getTypePath(file.mimetype); // image / audio / etc
        const datePath = getDatePath(); // 2020_11_06
        const uploadDir = path.join(
            __dirname,
            `../uploads/${typePath}/${datePath}`
        );

        // 폴더가 없는 경우 새로생성
        // uploads > image / audio / etc > 2020_11_06
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(
            null,
            `${getTypePath(file.mimetype)}-${Date.now()}-${
                file.mimetype.split("/")[1]
            }`
        );
    },
});
module.exports = multer({ storage: storage });
