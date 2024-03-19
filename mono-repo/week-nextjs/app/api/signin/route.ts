import { NextRequest, NextResponse } from "next/server";
import jwt  from 'jsonwebtoken';
import prisma from "@/db/db";

export const GET = (req: NextRequest, res: NextResponse) => {
    return NextResponse.json({
        message : "Hello form singin request"
    }, {
        status : 200
    })
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json();
    const { userName, password } = body;
    if (!userName || !password) {
        return NextResponse.json({
            message : "Mention all input parameters"
        }, {
            status : 411
        })
    }
    try {
        const response = await prisma.user.findUnique({
            where: {
                userName
            }
        });
        if (!response) {
            return NextResponse.json({
                message : "UserName not-found, Try with other userName"
            }, {
                status : 200
            })
        }
        else {
            const token = await jwt.sign({ userName }, "secret");
            return NextResponse.json({
                token : token
            }, {
                status: 200
            })
        }
    }
    catch (err) {
        return NextResponse.json({
            message : "Error occured at" + err
        })
    }
}