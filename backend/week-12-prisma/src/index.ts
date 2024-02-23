import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const insertUserData = async (firstName: string, email: string, password: string) => {
    const result = await prisma.user.create({
        data: {
            firstName,
            email,
            password
        }
    });

    console.log("result", result);
}

insertUserData("sa", "sa@gmail.com", "pemmaka");