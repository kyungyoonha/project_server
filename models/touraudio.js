"use strict";
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Touraudio", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        /// ### ☆ tourinx => touridx
        tourinx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        scripttitle: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        scriptcontents: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        scriptlanguage: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        audiofilename: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        audiofilepath: {
            type: DataTypes.STRING(200), // ### ☆ 200으로 올릴것
            allowNull: false,
        },
        audiolanguage: { type: DataTypes.STRING(200) },
        mainaudioYN: { type: DataTypes.STRING(1) },
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
