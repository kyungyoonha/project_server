const { Purchase, Purchasetour, Purchasecode } = require("../../models");
const paginate = require("express-paginate");
const { makeWhereCondition } = require("../../utils/pathFunc");

exports.getPurchase = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Purchase.findAndCountAll({
            include: ["purchasetour"],
            limit,
            offset: req.offset,
            where,
        });
        const pageCount = Math.ceil(results.count / limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            page
        );
        res.status(200).json({ pageCount, pages, data: results.rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.PurchaseInsert = async (req, res) => {
    try {
        const newPurchase = await Purchase.create(req.body);
        await newPurchase.save();
        res.status(200).json(newPurchase);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.PurchasetourInsert = async (req, res) => {
    try {
        const newPurchasetour = await Purchasetour.create(req.body);
        await newPurchasetour.save();
        res.status(200).json(newPurchasetour);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getPruchasecode = async (req, res) => {
    try {
        const { page, limit, ...rest } = req.query;
        const where = makeWhereCondition(rest);
        const results = await Purchasecode.findAndCountAll({
            limit,
            offset: req.offset,
            where,
        });
        const pageCount = Math.ceil(results.count / limit);
        const pages = paginate.getArrayPages(req)(
            7, // 몇개의 페이지씩 볼건지
            pageCount,
            page
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
