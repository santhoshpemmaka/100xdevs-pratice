import { Router } from "express";
import authMiddleware from "../middleware";
import { PrismaClient } from "@prisma/client";

const routes = Router();

const prisma = new PrismaClient();

//@ts-ignore
routes.get("/status", (req, res) => {
    return res.status(200).json({
        message : "Healthy is up"
    })
})

interface TagName {
    tagName : string
}

routes.post("/", authMiddleware, async (req, res) => {
    const { title, body, tags } = req.body;
    try {
        // @ts-ignore
        const userId = req.userId;
        if (!title || !body || tags.length == 0) {
            return res.status(411).json({
                message: "Provide input fields"
            })
        };
        console.log("reached", tags);
        const posts = await prisma.post.create({
            data: {
                title: title,
                body: body,
                userId: userId,
                tag: {
                    create: {
                        tags: tags.map((tag: TagName) => (tag)),
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
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            messsage: "Error occured on " + err ? err : "post create route"
        })
    }
});


routes.get("/", authMiddleware, async (req, res) => {
    try {
        const postLists = await prisma.post.findMany({});
        return res.status(200).json({
            posts: postLists
        })
    }
    catch (Err) {
        return res.status(500).json({
            message: "Error occured " + Err ? Err : "get posts router"
        })
    }

});

routes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({
            post : post
        })
    }
    catch (Err) {
        return res.status(500).json({
            message  :"Error occured at" + Err ? Err : "get post by id"
        })
    }
})

routes.post("/:id", async (req, res) => {
    const { title, body, tags } = req.body;
    const { id } = req.params;
    try {
        if (!title || !body || !tags) {
            return res.status(411).json({
                message: "Provide input all fields"
            })
        };
        const updatePost = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                body,
                tag: {
                    create: {
                        tags: tags.map((tag: TagName) => tag)
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
        })
    }
    catch (Err) {
        return res.status(500).json({
            message: "Error occured at" + Err ? Err : "update post"
        })
    }
});

routes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.$transaction([
            prisma.tag.deleteMany({
                where: {
                    postId :Number(id)
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
            
        ])
        
        return res.status(200).json({
            message: "Post delete successfully",
            id : id
        })
    }
    catch (Err) {
        return res.status(500).json({
            message : "Error occured at " + Err ? Err : "delete posts"
        })
    }
})


export default routes;