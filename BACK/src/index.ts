import express from 'express';
import {dataBase} from './db/dataBase';
import cors from 'cors';

const server = express();
const PORT = 3600;

server.use(cors());
server.use(express.json());

//! TS ignora el parámetro con un _
server.get('/ping', (_req, res) => {
    console.log('PING');
    res.send('PONG');
})

server.listen(PORT, () => {
    dataBase.sync({ force: false });
    console.log(`Server listen on port: ${PORT}`);
})

import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getOneTask,
    statusTask,
    getDeletedTasks,
} from './controllers/taskControllers';

server.get('/tasks', getAllTasks);
server.get('/tasks/:id', getOneTask);
server.get('/taskStatus', getDeletedTasks);
server.post('/tasks', createTask);
server.put('/tasks/:id', updateTask);
server.put('/taskStatus/:id', statusTask);
server.delete('/tasks/:id', deleteTask);