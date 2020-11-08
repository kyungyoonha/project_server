"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Drivercomplain", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },

        driveridx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        complain: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        useridx: {
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
