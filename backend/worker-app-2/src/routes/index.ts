import { Router } from "express";
import userRouter from './user';
import postRouter from './post';


const routes = Router();
routes.use("/user",userRouter);
routes.use("/posts", postRouter);

export default routes;

