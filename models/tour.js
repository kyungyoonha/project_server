"use strict";
module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define("Tour", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        tourname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        nationtype: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        nationcodeidx: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        areacodeidx: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        tourcode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        telnumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        admissionfee: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        operatingtime: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        interesttag: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        inextroversion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        openclose: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subaudioYN: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        mainaudioYN: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        lat: {
            type: DataTypes.DECIMAL(11, 4),
            allowNull: false,
        },
        lng: {
            type: DataTypes.DECIMAL(11, 4),
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

    Tour.associate = (models) => {
        Tour.hasMany(models.Trabus, {
            as: "Trabus",
            foreignKey: "touridx",
            sourceKey: "idx",
        });

        Tour.hasMany(models.Touraudio, {
            as: "Touraudio",
            foreignKey: "touridx",
            sourceKey: "idx",
        });

        Tour.hasMany(models.Tourpicture, {
            as: "Tourpicture",
            foreignKey: "touridx",
            sourceKey: "idx",
        });

        Tour.hasMany(models.Purchase, {
            as: "Purchase",
            foreignKey: "touridx",
            sourceKey: "idx",
        });

        Tour.hasMany(models.Purchasetour, {
            as: "Purchasetour",
            foreignKey: "touridx",
            sourceKey: "idx",
        });
    };
    return Tour;
};
