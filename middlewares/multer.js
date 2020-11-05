//이미지 저장되는 위치 설정
const path = require("path");
const uploadFolderName = require("../utils/uploadFolderName");

//multer 셋팅
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const addPath = uploadFolderName(file.mimetype);
        const uploadDir = path.join(__dirname, `../uploads/${addPath}`);
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(
            null,
            file.originalname.split(".")[0] +
                "-" +
                Date.now() +
                "." +
                file.mimetype.split("/")[1]
        );
    },
});
module.exports = multer({ storage: storage });
