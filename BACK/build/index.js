"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataBase_1 = require("./db/dataBase");
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
const PORT = 3600;
server.use((0, cors_1.default)());
server.use(express_1.default.json());
//! TS ignora el parámetro con un _
server.get('/ping', (_req, res) => {
    console.log('PING');
    res.send('PONG');
});
server.listen(PORT, () => {
    dataBase_1.dataBase.sync({ force: false });
    console.log(`Server listen on port: ${PORT}`);
});
const taskControllers_1 = require("./controllers/taskControllers");
server.get('/tasks', taskControllers_1.getAllTasks);
server.get('/tasks/:id', taskControllers_1.getOneTask);
server.get('/taskStatus', taskControllers_1.getDeletedTasks);
server.post('/tasks', taskControllers_1.createTask);
server.put('/tasks/:id', taskControllers_1.updateTask);
server.put('/taskStatus/:id', taskControllers_1.statusTask);
server.delete('/tasks/:id', taskControllers_1.deleteTask);
