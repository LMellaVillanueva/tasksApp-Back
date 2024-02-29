"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define('Pen', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });
};
