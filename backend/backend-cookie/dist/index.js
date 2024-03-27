"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello from world!"
    });
});
app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jsonwebtoken_1.default.sign({ email }, "secret", { expiresIn: 3600 * 60 * 60 });
    res.cookie('token', token);
    return res.status(200).json({
        message: "Signin successfully!"
    });
});
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(411).json({
            message: "Invalid token"
        });
    }
    return res.status(200).json({
        name: "santhosh"
    });
});
app.post('/logout', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(411).json({
            message: "Invalid token"
        });
    }
    res.clearCookie('token');
    return res.status(200).json({
        message: "Logout successfull!"
    });
});
app.listen(3000, () => {
    console.log("Server is running on port", 3000);
});
