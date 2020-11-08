"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Purchasecode", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        purchasedate: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        purchasetype: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        codenumber: { type: DataTypes.STRING(6) },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        purchaseuser: {
            type: DataTypes.STRING(50),
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
