"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define('Task', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, { timestamps: false });
};
