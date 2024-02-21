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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const routes = (0, express_1.Router)();
routes.get("/status", (req, res) => {
    return res.status(200).json({
        message: "Healthy Up"
    });
});
routes.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(411).json({
                message: "Provide all input parameters"
            });
        }
        const userExists = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userExists) {
            return res.status(411).json({
                message: "Email already exists, Try again other email id!"
            });
        }
        const result = yield prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });
        const userId = result.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.SECRET || "");
        return res.status(200).json({
            message: "User created successfully",
            token: token
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occured in" + err ? err : "signup router"
        });
    }
}));
routes.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(411).json({
                message: "Provide all inputs parameters"
            });
        }
        const checkEmail = yield prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (!checkEmail) {
            return res.status(411).json({
                message: "Wrong crendentials, check it once!"
            });
        }
        const userId = checkEmail.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.SECRET || "");
        return res.status(200).json({
            token: token
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occured in" + err ? err : "signin router"
        });
    }
}));
exports.default = routes;
