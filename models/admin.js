
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("admin", {
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
            unique: true,
        },
        pw: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        birthday: { type: DataTypes.DATE, defaultValue: null, },
        telnumber: { type: DataTypes.STRING(50) },
        email: { type: DataTypes.STRING(200) },
        englishname: { type: DataTypes.STRING(50) },
        address: { type: DataTypes.STRING(200) },
        entryYear: { type: DataTypes.STRING(4) },
        duty: { type: DataTypes.INTEGER },
        department: { type: DataTypes.INTEGER },
        etc: { type: DataTypes.TEXT },
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
