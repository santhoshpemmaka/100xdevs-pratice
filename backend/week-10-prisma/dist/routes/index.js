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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const routes = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
routes.post("/user-create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
        return res.status(401).json({
            message: "Provide all input parameters"
        });
    }
    const userId = yield prisma.user.create({
        data: {
            email,
            firstName,
            lastName
        },
        select: {
            id: true
        }
    });
    return res.status(201).json({
        userId: userId.id
    });
}));
routes.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello from primsa backend"
    });
});
routes.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoList = yield prisma.todo.findMany({
        take: 10,
        include: {
            user: {
                select: {
                    firstName: true,
                    email: true
                }
            }
        },
    });
    return res.status(200).json({
        todo: todoList,
    });
}));
routes.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
        return res.status(401).json({
            message: "Provide all inputs parameter"
        });
    }
    else {
        const todoList = yield prisma.todo.create({
            data: {
                title,
                description,
                userId
            },
            select: {
                id: true
            }
        });
        return res.status(200).json({
            todoId: todoList.id
        });
    }
}));
routes.post("/update-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(401).json({
            message: "Provide todo id"
        });
    }
    const result = yield prisma.todo.update({
        where: {
            id: id
        },
        data: {
            done: true
        },
        select: {
            id: true
        }
    });
    return res.status(200).json({
        id: id,
        message: "Successfully todo is updated"
    });
}));
routes.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(401).json({
            message: "Provide input id"
        });
    }
    ;
    const deleteTodo = yield prisma.todo.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    });
    return res.status(200).json({
        id: id,
        message: deleteTodo
    });
}));
exports.default = routes;
