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
    const { purchTour, ...body } = req.body;

    try {
        if (!body.purchasecodeidx) {
            res.status(400).json({ error: "구매코드를 선택해주세요" });
        }

        if (!purchTour.length) {
            res.status(400).json({ error: "관광지를 추가해주세요" });
        }

        const newPurchase = await Purchase.create(body);
        await newPurchase.save();

        purchTour.forEach(async (item, idx) => {
            const newPurchasetour = await Purchasetour.create({
                purchaseidx: newPurchase.idx,
                touridx: item.idx,
                tourstep: idx,
                reguser: body.reguser,
                moduser: body.moduser,
            });
            await newPurchasetour.save();
        });

        res.status(200).json(newPurchase);
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
