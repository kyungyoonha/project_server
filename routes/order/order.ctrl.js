const models = require("../../models");

exports.purchasecodeInsert = async (req, res) => {
    try {
        const newPurchasecode = await models.purchasecode.create(req.body);
        await newPurchasecode;
        res.status(200).json(newPurchasecode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};