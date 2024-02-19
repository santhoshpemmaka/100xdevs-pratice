import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(403).json({})
    }

    const token = authToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET || "");
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({})
    }
}


export default authMiddleware;