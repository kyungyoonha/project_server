const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.send("member");
});

module.exports = router;
