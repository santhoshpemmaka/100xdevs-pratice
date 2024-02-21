import jwt from "jsonwebtoken";
import Express, { NextFunction, Response, Request } from 'express';


const authMiddleware = (req: Request, res: Response, next:NextFunction) => {
    //@ts-ignore
    const authtoken = req.headers.authorization;
    if (!authtoken) {
        return res.status(411).json({
            message : "token is missing"
        })
    }

    const token = authtoken.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET || "");
    if (decode) {
        //@ts-ignore
        req.userId = decode.userId;
        next();
    }
    else {
        return res.status(411).json({
            message : "Un authorization request"
        })
    }
}

export default authMiddleware;