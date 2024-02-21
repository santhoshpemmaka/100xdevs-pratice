import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const routes = Router();

routes.get("/status", (req, res) => {
    return res.status(200).json({
        message: "Healthy Up"
    })
});

routes.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(411).json({
                message: "Provide all input parameters"
            })
        }
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userExists) {
            return res.status(411).json({
                message: "Email already exists, Try again other email id!"
            })
        }
        const result = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });
        const userId = result.id;
        const token = jwt.sign({ userId }, process.env.SECRET || "");
        return res.status(200).json({
            message: "User created successfully",
            token: token
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occured in" + err ? err : "signup router"
        })
    }
});


routes.post('/signin',async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(411).json({
                message : "Provide all inputs parameters"
            })
        }
        const checkEmail = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (!checkEmail) {
            return res.status(411).json({
                message  :"Wrong crendentials, check it once!"
            })
        }
        const userId = checkEmail.id;
        const token = jwt.sign({ userId }, process.env.SECRET || "");
        return res.status(200).json({
            token : token
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Error occured in" + err ? err : "signin router"
        })
    }
})




export default routes;