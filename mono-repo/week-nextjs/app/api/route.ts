import { NextRequest, NextResponse } from "next/server";


export const GET = (req: NextRequest) => {
    const token = req.headers.get("Authorization");
    console.log("token", token);
    return NextResponse.json({
        status: "Server is running on 3000 PORT"
    })
};

