"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("purchasetour", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        purchaseidx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        touridx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tourstep: {
            type: DataTypes.INTEGER,
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
