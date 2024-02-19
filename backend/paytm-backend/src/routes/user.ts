import { Request, Response, Router } from "express";
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware";
const routes = Router();
const prisma = new PrismaClient()


routes.get("/info", (req: Request, res: Response) => {
    return res.status(200).json({
        message : "info"
    })
})

routes.post("/signup", async(req: Request, res: Response) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        if (!email || !firstName || !lastName || !password) {
            return res.status(411).json({
                message : "Incorrect inputs"
            })
        };
        const isAlreadyUser = await prisma.user.findMany({
            where: {
                email: email
            }
        });
        if (isAlreadyUser.length != 0) {
            return res.status(411).json({
                message : "Email already taken. Try different email id"
            })
        }
        const user = await prisma.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password:password
            },
            select: {
                id: true
            }
        })
        const balanceAdded = await prisma.balance.create({
            data: {
                amount: Math.random() * 10000,
                userId : user.id
            }
        })
        const userId = user.id;
        const token = jwt.sign({ userId }, process.env.SECRET || "");
        console.log("env",process.env.SECRET)
        return res.status(200).json({
            message: "User created successfully",
            token : token
        })
        
    }
    catch (err) {
        return res.status(500).json({
            message : "Error occcured" + err ? err : "signup router"
        })
    }
});

interface SignType {
    id : number 
}

routes.post("/signin", async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(411).json({
                message : "Invalid inputs"
            })
        }
        const user:SignType | null= await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        if (!user) {
            return res.status(411).json({
                message : "Error while loggin in"
            })
        };
        
        const userId = user.id
        const token = jwt.sign({ userId }, process.env.SECRET || "");
        return res.status(200).json({
            token : token
        })
        
    }
    catch (err) {
        return res.status(500).json({
            message : "Error occcured" + err ? err : "signup router"
        })
    }
})

// @ts-ignore
routes.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const { password, firstName, lastName } = req.body;
        if (!password || !firstName || !lastName) {
            return res.status(411).json({
                message: "Provide correct inputs"
            })
        }
        // @ts-ignore
        const userId = req.userId;
        if (!userId) {
            return res.status(411).json({
                message: "Error while updating information"
            })
        }

        const updateuser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password,
                firstName,
                lastName
            }
        });

        return res.status(200).json({
            message: "Updated successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Error occcured" + err ? err : "signup router"
        })
    }
});

//@ts-ignore
routes.get("/bulk", authMiddleware, async (req: Request, res: Response) => {
    try {
        const searchText = req.query.filter || "";
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        firstName: {
                            //@ts-ignore
                            contains : searchText ,
                        }
                    },
                    {
                        firstName: {
                            //@ts-ignore
                            contains : searchText,
                        }
                    }
                ]
            }
        })

        return res.status(200).json({
            users : users
        })
    }   
    catch (err) {
        return res.status(500).json({
            message : "Error occcured" + err ? err : "signup router"
        })
    }
})


export default routes;
