require('dotenv').config();
import {Sequelize} from 'sequelize';
import TaskModel from '../models/Task';

const {DB_NAME, DB_USERNAME, DB_PORT, DB_PASSWORD} = process.env;

const dataBase = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`);

TaskModel(dataBase);

const {Task} = dataBase.models;

export {dataBase, Task};