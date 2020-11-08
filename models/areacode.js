"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Areacode", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        nationcodeidx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sidocode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        sidoname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        areacode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        areaname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        mainpicYN: { type: DataTypes.STRING(1) },
        mainpicname: { type: DataTypes.STRING(100) },
        mainpicpath: { type: DataTypes.STRING(100) },
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
