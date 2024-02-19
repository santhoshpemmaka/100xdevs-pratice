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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("../middleware"));
const routes = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
routes.get("/info", (req, res) => {
    return res.status(200).json({
        message: "info"
    });
});
routes.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, password } = req.body;
        if (!email || !firstName || !lastName || !password) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }
        ;
        const isAlreadyUser = yield prisma.user.findMany({
            where: {
                email: email
            }
        });
        if (isAlreadyUser.length != 0) {
            return res.status(411).json({
                message: "Email already taken. Try different email id"
            });
        }
        const user = yield prisma.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            },
            select: {
                id: true
            }
        });
        const balanceAdded = yield prisma.balance.create({
            data: {
                amount: Math.random() * 10000,
                userId: user.id
            }
        });
        const userId = user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.SECRET || "");
        console.log("env", process.env.SECRET);
        return res.status(200).json({
            message: "User created successfully",
            token: token
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occcured" + err ? err : "signup router"
        });
    }
}));
routes.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(411).json({
                message: "Invalid inputs"
            });
        }
        const user = yield prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        if (!user) {
            return res.status(411).json({
                message: "Error while loggin in"
            });
        }
        ;
        const userId = user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.SECRET || "");
        return res.status(200).json({
            token: token
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occcured" + err ? err : "signup router"
        });
    }
}));
// @ts-ignore
routes.post("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, firstName, lastName } = req.body;
        if (!password || !firstName || !lastName) {
            return res.status(411).json({
                message: "Provide correct inputs"
            });
        }
        // @ts-ignore
        const userId = req.userId;
        if (!userId) {
            return res.status(411).json({
                message: "Error while updating information"
            });
        }
        const updateuser = yield prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password,
                firstName,
                lastName
            }
        });
        return res.status(200).json({
            message: "Updated successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occcured" + err ? err : "signup router"
        });
    }
}));
//@ts-ignore
routes.get("/bulk", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchText = req.query.filter || "";
        const users = yield prisma.user.findMany({
            where: {
                OR: [
                    {
                        firstName: {
                            //@ts-ignore
                            contains: searchText,
                        }
                    },
                    {
                        firstName: {
                            //@ts-ignore
                            contains: searchText,
                        }
                    }
                ]
            }
        });
        return res.status(200).json({
            users: users
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occcured" + err ? err : "signup router"
        });
    }
}));
exports.default = routes;
