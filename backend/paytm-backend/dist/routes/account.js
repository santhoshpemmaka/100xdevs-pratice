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
const middleware_1 = __importDefault(require("../middleware"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const routes = (0, express_1.Router)();
// @ts-ignore
routes.get("/balance", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    console.log("userId", userId);
    const balance = yield prisma.balance.findFirst({
        where: {
            userId: userId
        }
    });
    console.log("la", balance);
    if (!balance) {
        return res.status(411).json({
            message: "Un-authorized request"
        });
    }
    return res.status(200).json({
        //@ts-ignore
        balance: balance.amount
    });
}));
//@ts-ignore
routes.post('/transfer', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const { to, amount } = req.body;
    const balance = yield prisma.balance.findFirst({
        where: {
            userId: userId
        },
        select: {
            amount: true
        }
    });
    if (!userId) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    console.log("balance", balance);
    //@ts-ignore
    if ((balance === null || balance === void 0 ? void 0 : balance.amount) < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    yield prisma.$transaction([
        prisma.balance.update({
            where: {
                userId: userId
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        }),
        prisma.balance.update({
            where: {
                userId: to
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        })
    ]);
    return res.status(200).json({
        message: "Transfer successful"
    });
}));
exports.default = routes;
