"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const todo_1 = __importDefault(require("./routes/todo"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello from the server"
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default.connect('mongodb+srv://santhoshpemmaka:ygbqtxWRdusk1KKD@cluster0.qyzqtwb.mongodb.net/courses', { dbName: "courses" });
