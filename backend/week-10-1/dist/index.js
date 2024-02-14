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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstname, lastname) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma.user.create({
            data: {
                email: username,
                password,
                firstName: firstname,
                lastName: lastname
            },
            select: {
                id: true,
                email: true
            }
        });
        console.log("insert", result);
    });
}
const updateUser = (username, { firstName, lastName }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            email: username
        },
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            email: true
        }
    });
    console.log("update", result);
});
const deleteUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.delete({
        where: {
            email: username
        },
        select: {
            id: true
        }
    });
    console.log("delete", result);
});
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany();
    console.log("allusers", result);
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findFirst({
        where: {
            email
        },
        select: {
            todos: true,
            id: true,
            email: true
        }
    });
    console.log("get user email", result);
});
const createTodo = (userId, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.todo.create({
        data: {
            title,
            userId,
            description
        },
        select: {
            userId: true
        }
    });
    console.log("create todo", result);
});
const getTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.todo.findMany({
        where: {
            userId: userId
        }
    });
    console.log("all todos", result);
});
const getTodosAndUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await prisma.user.findFirst({
    //     where: {
    //         id: userId
    //     }
    // });
    // const resultTodo = await prisma.todo.findMany({
    //     where: {
    //         userId
    //     },
    // })
    // console.log("todos", resultTodo);
    // console.log("user",user)
    const todoDetails = yield prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            title: true,
            description: true,
            done: true,
            user: true
        }
    });
    console.log("todo Detials", todoDetails);
});
// insertUser("sa1@gmail.com","3edsaas","sdfas","asdfsad")
// updateUser("santhosh@gmail.com",{ firstName :"amaranth",lastName :"ada"})
// // deleteUser("sa@gmail.com");
// getUser();
// getUserByEmail("santhosh@gmail.com");
// createTodo(1, "go to gym1", "go to gym and do 10 pushups1");
// getTodos(5);
getTodosAndUserDetails(1);
