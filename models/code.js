"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Code", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codename: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        parentcode: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        parentcodename: {
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
