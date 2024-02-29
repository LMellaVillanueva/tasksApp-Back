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
exports.getOnePen = exports.deletePen = exports.updatePen = exports.createPen = exports.getAllPens = void 0;
const dataBase_1 = require("../db/dataBase");
const getAllPens = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPensFound = yield dataBase_1.Pen.findAll();
        if (allPensFound)
            return res.status(200).json({
                status: true,
                allPensFound
            });
        else
            return res.status(404).json({
                status: true,
                message: 'Pens not found'
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
exports.getAllPens = getAllPens;
const createPen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (name) {
            const [PenCreated, create] = yield dataBase_1.Pen.findOrCreate({ where: { name }, defaults: { name } });
            if (create)
                return res.status(200).json({
                    status: true,
                    PenCreated
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'This pen already exists'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Name missing!'
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
exports.createPen = createPen;
const updatePen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (id) {
            const penUpdated = yield dataBase_1.Pen.update({ name }, { where: { id } });
            if (penUpdated)
                return res.status(200).json({
                    status: true,
                    penUpdated
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not create the Pen.'
                });
        }
        else
            return res.status(404).json({
                status: true,
                message: 'Name nedeed.'
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
exports.updatePen = updatePen;
const deletePen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const penDeleted = yield dataBase_1.Pen.destroy({ where: { id } });
            if (penDeleted)
                return res.status(200).json({
                    status: true,
                    message: 'Pen deleted!'
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not delete the Pen'
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
exports.deletePen = deletePen;
const getOnePen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const onePen = yield dataBase_1.Pen.findByPk(id);
            if (onePen)
                return res.status(200).json({
                    status: true,
                    onePen
                });
            else
                return res.status(400).json({
                    status: true,
                    message: 'Could not find the Pen'
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
exports.getOnePen = getOnePen;
