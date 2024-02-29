"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusTask = exports.getDeletedTasks = exports.getOneTask = exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const dataBase_1 = require("../db/dataBase");
const getAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTasks = yield dataBase_1.Task.findAll();
        if (allTasks)
            return res.status(200).json({
                status: true,
                allTasks
            });
        else
            return res.status(404).json({
                status: true,
                message: 'There is no tasks.'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status } = req.body;
        if (name && description) {
            const [taskCreated, create] = yield dataBase_1.Task.findOrCreate({
                where: { name, status },
                defaults: { name, description }
            });
            if (create)
                return res.status(200).json({
                    status: true,
                    taskCreated
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'This task already exists.'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Name or Description missing.'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (id) {
            const taskUpdated = yield dataBase_1.Task.update({ name, description }, { where: { id } });
            if (taskUpdated)
                return res.status(200).json({
                    status: true,
                    taskUpdated
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not create the Task.'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Name or Description nedeed.'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const taskDeleted = yield dataBase_1.Task.destroy({ where: { id } });
            if (taskDeleted)
                return res.status(200).json({
                    status: true,
                    message: 'Task deleted!'
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not delete the Task'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Id missing!'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.deleteTask = deleteTask;
const getOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const oneTask = yield dataBase_1.Task.findByPk(id);
            if (oneTask)
                return res.status(200).json({
                    status: true,
                    oneTask
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not find the Task'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Id missing!'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.getOneTask = getOneTask;
const getDeletedTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasksDeleted = yield dataBase_1.Task.findAll({ where: { status: false } });
        if (tasksDeleted)
            return res.status(200).json({
                status: true,
                tasksDeleted
            });
        else
            return res.status(404).json({
                status: true,
                message: 'Could not delete the task'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.getDeletedTasks = getDeletedTasks;
const statusTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (id) {
            const statusUpdated = yield dataBase_1.Task.update({ status }, { where: { id } });
            if (statusUpdated)
                return res.status(200).json({
                    status: true,
                    statusUpdated
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not update the status'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Missing task'
            });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            });
        else
            return null;
    }
});
exports.statusTask = statusTask;
