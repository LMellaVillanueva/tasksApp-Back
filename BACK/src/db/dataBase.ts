require('dotenv').config();
import {Sequelize} from 'sequelize';
import TaskModel from '../models/Task';

const {POSTGRES_URL} = process.env;

// const dataBase = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`);
const dataBase = new Sequelize(`${POSTGRES_URL}`);

TaskModel(dataBase);

const {Task} = dataBase.models;

export {dataBase, Task};