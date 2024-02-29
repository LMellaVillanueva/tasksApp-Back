"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.dataBase = void 0;
require('dotenv').config();
const sequelize_1 = require("sequelize");
const Task_1 = __importDefault(require("../models/Task"));
const { DB_NAME, DB_USERNAME, DB_PORT, DB_PASSWORD } = process.env;
const dataBase = new sequelize_1.Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`);
exports.dataBase = dataBase;
(0, Task_1.default)(dataBase);
const { Task } = dataBase.models;
exports.Task = Task;
