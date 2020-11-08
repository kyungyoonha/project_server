"use strict";
module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("Purchase", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        tourtype: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        touridx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tourdays: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tourstartday: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        tourendday: { type: DataTypes.STRING(50) },
        tourmember: { type: DataTypes.INTEGER },
        price: { type: DataTypes.INTEGER },
        tourstarttime: { type: DataTypes.STRING(50) },
        useridx: { type: DataTypes.STRING(50) },
        purchasecode: { type: DataTypes.STRING(50) },

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

    Purchase.associate = (models) => {
        Purchase.hasOne(models.Purchasetour, {
            as: "Purchasetour",
            foreignKey: "purchaseidx",
            sourceKey: "idx",
            // onDelete: "CASCASE",
        });
    };
    return Purchase;
};
