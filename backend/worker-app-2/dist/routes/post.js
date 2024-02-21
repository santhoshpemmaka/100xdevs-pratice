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
const routes = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
//@ts-ignore
routes.get("/status", (req, res) => {
    return res.status(200).json({
        message: "Healthy is up"
    });
});
routes.post("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, tags } = req.body;
    try {
        // @ts-ignore
        const userId = req.userId;
        if (!title || !body || tags.length == 0) {
            return res.status(411).json({
                message: "Provide input fields"
            });
        }
        ;
        console.log("reached", tags);
        const posts = yield prisma.post.create({
            data: {
                title: title,
                body: body,
                userId: userId,
                tag: {
                    create: {
                        tags: tags.map((tag) => (tag)),
                    }
                }
            },
            include: {
                tag: {
                    select: {
                        tags: true
                    }
                }
            }
        });
        if (posts) {
            return res.status(200).json({
                message: "post created successfully",
                id: posts.id
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            messsage: "Error occured on " + err ? err : "post create route"
        });
    }
}));
routes.get("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postLists = yield prisma.post.findMany({});
        return res.status(200).json({
            posts: postLists
        });
    }
    catch (Err) {
        return res.status(500).json({
            message: "Error occured " + Err ? Err : "get posts router"
        });
    }
}));
routes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({
            post: post
        });
    }
    catch (Err) {
        return res.status(500).json({
            message: "Error occured at" + Err ? Err : "get post by id"
        });
    }
}));
routes.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, tags } = req.body;
    const { id } = req.params;
    try {
        if (!title || !body || !tags) {
            return res.status(411).json({
                message: "Provide input all fields"
            });
        }
        ;
        const updatePost = yield prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                body,
                tag: {
                    create: {
                        tags: tags.map((tag) => tag)
                    }
                }
            },
            select: {
                id: true
            }
        });
        return res.status(200).json({
            message: "Update post successfully",
            id: updatePost.id
        });
    }
    catch (Err) {
        return res.status(500).json({
            message: "Error occured at" + Err ? Err : "update post"
        });
    }
}));
routes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id", id);
    try {
        yield prisma.$transaction([
            prisma.tag.deleteMany({
                where: {
                    postId: Number(id)
                }
            }),
            prisma.post.delete({
                where: {
                    id: Number(id)
                },
                include: {
                    tag: true
                }
            }),
        ]);
        return res.status(200).json({
            message: "Post delete successfully",
            id: id
        });
    }
    catch (Err) {
        return res.status(500).json({
            message: "Error occured at " + Err ? Err : "delete posts"
        });
    }
}));
exports.default = routes;
