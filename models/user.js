"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        username: {
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
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        telnumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: { type: DataTypes.STRING(200) },
        address: { type: DataTypes.STRING(50) },
        emailaree: { type: DataTypes.STRING(1) },
        messageagree: { type: DataTypes.STRING(1) },
        pushagree: { type: DataTypes.STRING(1) },
        etc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        inextroversion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profilename: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        profilepath: {
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
