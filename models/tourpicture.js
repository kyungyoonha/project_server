"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Tourpicture", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        touridx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mainpicYN: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        seq: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        filename: { type: DataTypes.STRING(100) },
        filepath: { type: DataTypes.STRING(200) },
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
