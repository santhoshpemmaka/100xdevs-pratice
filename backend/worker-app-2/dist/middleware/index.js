"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    //@ts-ignore
    const authtoken = req.headers.authorization;
    if (!authtoken) {
        return res.status(411).json({
            message: "token is missing"
        });
    }
    const token = authtoken.split(' ')[1];
    const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET || "");
    if (decode) {
        //@ts-ignore
        req.userId = decode.userId;
        next();
    }
    else {
        return res.status(411).json({
            message: "Un authorization request"
        });
    }
};
exports.default = authMiddleware;
