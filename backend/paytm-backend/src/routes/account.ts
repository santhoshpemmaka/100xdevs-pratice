import { Router, Response, Request } from "express";
import authMiddleware from "../middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const routes = Router();


// @ts-ignore
routes.get("/balance", authMiddleware, async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId;
    console.log("userId", userId);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: userId
        }
    })
    console.log("la", balance);
    if (!balance) {
        return res.status(411).json({
            message: "Un-authorized request"
        })
    }
    return res.status(200).json({
        //@ts-ignore
        balance: balance.amount
    })
    
});
//@ts-ignore
routes.post('/transfer', authMiddleware, async (req: Request, res: Response) => {
  
    //@ts-ignore
    const userId = req.userId;
    const { to, amount } = req.body;
    const balance = await prisma.balance.findFirst({
        where: {
            userId: userId
        },
        select: {
            amount: true
        }
    });

    if (!userId) {
        return res.status(400).json({
            message : "Invalid account"
        })
    } 
    console.log("balance", balance);
    //@ts-ignore
    if (balance?.amount < amount) {
        return res.status(400).json({
            message :  "Insufficient balance"
        })
    }

    await prisma.$transaction([
        prisma.balance.update({
            where: {
                userId: userId
            },
            data: {
                amount: {
                    decrement : amount
                }
            }
        }),
        prisma.balance.update({
            where: {
                userId: to
            },
            data: {
                amount: {
                    increment : amount
                }
            }
        })
    ])
    return res.status(200).json({
        message : "Transfer successful"
    })
})



export default routes;