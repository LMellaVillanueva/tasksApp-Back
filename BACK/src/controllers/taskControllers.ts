import { Request, Response } from "express";
import {Task} from "../db/dataBase";
import { Op } from "sequelize";

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const {name} = req.query

        if(name){
            const taskFound = await Task.findOne({
                where:{
                    name:{
                        [Op.iLike]: `${name}`
                    }
                }
            })
            if(taskFound) return res.status(200).json({
                status: true,
                taskFound
            })
            else return res.status(400).json({
                status: true,
                message: 'Could not found the task.'
            })
        } else {
            const allTasks = await Task.findAll();
            if (allTasks)
                return res.status(200).json({
                    status: true,
                    allTasks
                })
            else return res.status(404).json({
                status: true,
                message: 'There is no tasks.'
            })
        }
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            })
        else return null;
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { name, description, status } = req.body;
        if (name && description) {
            const [taskCreated, create] = await Task.findOrCreate({
                where: { name, status },
                defaults: { name, description }
            })
            if (create) return res.status(200).json({
                status: true,
                taskCreated
            })
            else return res.status(400).json({
                status: true,
                message: 'This task already exists.'
            })
        }
        else return res.status(404).json({
            status: true,
            message: 'Name or Description missing.'
        })
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            })
        else return null;
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (id) {
            const taskUpdated = await Task.update({ name, description }, { where: { id } });
            if (taskUpdated) return res.status(200).json({
                status: true,
                taskUpdated
            })
            else return res.status(400).json({
                status: true,
                message: 'Could not create the Task.'
            })
        } else return res.status(404).json({
            status: true,
            message: 'Name or Description nedeed.'
        })
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            })
        else return null;
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (id) {
            const taskDeleted = await Task.destroy({ where: { id } });
            if (taskDeleted) return res.status(200).json({
                status: true,
                message: 'Task deleted!'
            })
            else return res.status(400).json({
                status: true,
                message: 'Could not delete the Task'
            })
        } else return res.status(404).json({
            status: true,
            message: 'Id missing!'
        })

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                status: false,
                message: error.message
            })
        else return null;
    }
}

export const getOneTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (id) {
            const oneTask = await Task.findByPk(id);
            if (oneTask) return res.status(200).json({
                status: true,
                oneTask
            })
            else return res.status(400).json({
                status: true,
                message: 'Could not find the Task'
            })
        }
        else return res.status(404).json({
            status: true,
            message: 'Id missing!'
        })
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({
            status: false,
            message: error.message
        })
        else return null;
    }
}

export const getDeletedTasks = async(_req: Request, res: Response) => {
    try {
        const tasksDeleted = await Task.findAll({where: {status: false}})
        if(tasksDeleted) return res.status(200).json({
            status: true,
            tasksDeleted
        }) 
        else return res.status(404).json({
            status: true,
            message: 'Could not delete the task'
        })
    } catch (error) {
        if(error instanceof Error) return res.status(500).json({
            status: false,
            message: error.message
        })
        else return null;
    }
}

export const statusTask = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {status} = req.body
        if(id){
            const statusUpdated = await Task.update({status}, {where: {id}})
            if(statusUpdated) return res.status(200).json({
                status: true,
                statusUpdated
            })
            else return res.status(400).json({
                status: true,
                message: 'Could not update the status'
            })
        } 
        else return res.status(404).json({
            status: true,
            message: 'Missing task'
        })

    } catch (error) {
        if(error instanceof Error) return res.status(500).json({
            status: false,
            message: error.message
        })
        else return null;
    }
}