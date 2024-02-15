import { Request, Response, Router } from "express";
import { PrismaClient } from '@prisma/client';
const routes = Router();
const prisma = new PrismaClient()



routes.post("/user-create", async(req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
        return res.status(401).json({
            message : "Provide all input parameters"
        })
    }
    const userId = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName
        },
        select: {
            id: true
        }
    });

    return res.status(201).json({
        userId : userId.id
    })
})

routes.get("/", (req:Request,res:Response) => {
    return res.status(200).json({
        message : "Hello from primsa backend"
    })
})

routes.get("/todos", async (req: Request, res: Response) => {
    const todoList = await prisma.todo.findMany({
        take: 10,
        include: {
            user: {
                select: {
                    firstName:true,
                    email:true
                }
            }
        },
        
    });
    return res.status(200).json({
        todo: todoList,
    });
});

routes.post("/create-todo", async (req: Request, res: Response) => {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
        return res.status(401).json({
            message: "Provide all inputs parameter"
        })
    }
    else {
        const todoList = await prisma.todo.create({
            data: {
                title,
                description,
                userId
            },
            select: {
                id: true
            }
        });
        return res.status(200).json({
            todoId: todoList.id
        })
    }
});

routes.post("/update-todo", async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(401).json({
            message: "Provide todo id"
        })
    }
    const result = await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            done: true
        },
        select: {
            id: true
        }
    });
    return res.status(200).json({
        id: id,
        message: "Successfully todo is updated"
    })
});


routes.delete("/delete", async(req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(401).json({
            message : "Provide input id"
        })
    };
    const deleteTodo = await prisma.todo.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    });
    return res.status(200).json({
        id: id,
        message : deleteTodo
    })
})

export default routes;