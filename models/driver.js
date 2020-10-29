"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("driver", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },

        drivername: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        id: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        pw: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nationtype: { type: DataTypes.STRING(1) },
        nationcodeidx: { type: DataTypes.STRING },
        areacodeidx: { type: DataTypes.STRING },
        birthday: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        telnumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        cartype: { type: DataTypes.STRING(50) },
        carnumber: { type: DataTypes.STRING(50) },
        carlicense: { type: DataTypes.STRING(100) },
        businesstype: { type: DataTypes.STRING(1) },
        grade: { type: DataTypes.DECIMAL(3, 2) },
        etc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        businessname: { type: DataTypes.STRING(100) },
        drivername: { type: DataTypes.STRING(100) },
        driverpath: { type: DataTypes.STRING(200) },
        licensename: { type: DataTypes.STRING(100) },
        licensepath: { type: DataTypes.STRING(200) },
        carname: { type: DataTypes.STRING(100) },
        carpath: { type: DataTypes.STRING(200) },
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
