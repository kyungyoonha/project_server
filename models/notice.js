"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("notice", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        showYN: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        topYN: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        filepath: {
            type: DataTypes.STRING(200),
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
