"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(index_1.default);
app.listen(9000, () => {
    console.log("Server is running at", 3000);
});
// const insertUser = async (email: string, firstName: string, lastName: string) => {
//     const result = await prisma.user.create({
//         data: {
//             email,
//             firstName,
//             lastName
//         },
//         select: {
//             id: true
//         }
//     });
//     console.log("inser", result);
// };
// const insertTodo = async (title: string, description: string, userId: string) => {
//     const usertodo = await prisma.todo.create({
//         data: {
//             title,
//             description,
//             userId
//         },
//         select: {
//             id: true
//         }
//     });
//     console.log("usertodo", usertodo);
// }
// insertUser("santhosh@gmail.com", "santhosh", "pemmaka");
// insertTodo("go to gym", "go to gym daily", '65cd04d84b9646d8a2568c01');
