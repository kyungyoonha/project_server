const { Op } = require("sequelize");

exports.getTypePath = (mimetype) => {
    const typePath =
        mimetype.indexOf("image") > -1
            ? "image"
            : mimetype.indexOf("audio") > -1
            ? "audio"
            : "etc";

    return typePath;
};

exports.getDatePath = () => {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return `${year}_${month}_${day}`;
};

exports.makeWhereCondition = (queryObj) => {
    const keys = Object.keys(queryObj);
    const exceptDate = ["tourstartday", "tourendday", "purchasedate"];
    const condition = [];
    for (let key of keys) {
        if (queryObj[key]) {
            if (exceptDate.indexOf(key) > -1) {
                let startDate = new Date(
                    new Date(queryObj[key]).setHours(0, 0, 0, -1)
                );
                let endDate = new Date(
                    new Date(queryObj[key]).setHours(23, 59, 59, 999)
                );

                condition.push({
                    [key]: {
                        [Op.between]: [startDate, endDate],
                    },
                });
            } else {
                condition.push({
                    [key]: {
                        [Op.like]: `%${queryObj[key]}%`,
                    },
                });
            }
        }
    }

    return {
        [Op.and]: condition,
    };
};
