"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("nationcode", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        koreanname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        englishname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        code3: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        code2: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: "regdate",
        },
        reguser: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            name: "updatedAt",
            field: "moddate",
        },
        moduser: { type: DataTypes.STRING(50) },
    });
};
