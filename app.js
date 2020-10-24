require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const db = require("./models");

const app = express();
const port = 8000;

// DB authentication
db.sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        //return db.sequelize.sync();
        //return db.sequelize.drop();
    })
    .then(() => {
        console.log("DB Sync complete.");
        // 더미 데이터가 필요하면 아래 설정
        //  require('./config/insertDummyData')();
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// Middleware
app.use(bodyParser.json()); // request.body로 데이터 접근 가능
app.use(bodyParser.urlencoded({ extended: false })); // 노드의 queryStirng 사용하여 url 해석
app.use(cors());

// Static
app.use(express.static(path.resolve(__dirname, "uploads")));

// 라우터
app.use(require("./routes"));

app.listen(port, () => {
    console.log("app.js", __dirname);
    console.log("express listening on port", port);
});
