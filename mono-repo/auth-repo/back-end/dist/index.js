"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.post('/sign', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jsonwebtoken_1.default.sign({ userId: email }, 'secret');
    res.cookie('token', `Bearer ${token}`, { expires: new Date(Date.now() + 3600000 * 24), httpOnly: true });
    res.status(200).json({
        token: token
    });
});
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Server is up..."
    });
});
app.get('/user', (req, res) => {
    console.log("cookies", req.cookies);
    const token = req.cookies.token;
    console.log("token", token);
    return res.status(200).json({
        message: token
    });
});
app.post('/logout', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(200).json({
            message: "token is not there!"
        });
    }
    res.clearCookie('token');
    return res.status(200).json({
        message: "Cookie is removed"
    });
});
app.listen(3001, () => {
    console.log("Server is running on 3001");
});
