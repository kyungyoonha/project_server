const { Purchase, Purchasecode } = require("../../models");
const paginate = require("express-paginate");

exports.getPurchase = async (req, res) => {
    try {
        const results = await Purchase.findAndCountAll({
            include: ["purchasetour"],
            limit: req.query.limit,
            offset: req.offset,
        });
        const pageCount = Math.ceil(results.count / req.query.limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            req.query.page
        );
        res.status(200).json({ pageCount, pages, data: results.rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getPruchasecode = async (req, res) => {
    try {
        const results = await Purchasecode.findAndCountAll({
            limit: req.query.limit,
            offset: req.offset,
        });
        const pageCount = Math.ceil(results.count / req.query.limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            req.query.page
        );
        res.status(200).json({ pageCount, pages, data: results.rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.purchasecodeInsert = async (req, res) => {
    try {
        const newPurchasecode = await Purchasecode.create(req.body);
        await newPurchasecode;
        res.status(200).json(newPurchasecode);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
