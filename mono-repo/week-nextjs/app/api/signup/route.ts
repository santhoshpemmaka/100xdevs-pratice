import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { firstName, userName, password } = body;
    if (!firstName || !userName || !password) {
        return NextResponse.json({
            message : "Mention all input parameters"
        },{
            status : 411
        })
    }
    try {
        const isUserName = await prisma.user.findUnique({
            where: {
                userName
            }
        })
        if (isUserName) {
            return NextResponse.json({
                message: "User already exists, Try with other userName"
            }, {
                status : 200
            }
            )
        }
        const response = await prisma.user.create({
            data: {
                firstName,
                userName,
                password
            }
        });
        if (!response) {
            return NextResponse.json({
                message : "User signup unsuccessfull"
            })
        }
        else {
            const token = await jwt.sign({ userName }, "secret");
            return NextResponse.json({
                token
            })
        }
    }
    catch(err) {
        return NextResponse.json({
            message: "Error occured at"+ err
        }, {
            status : 500
        }
        )
    }
}