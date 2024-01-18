import express from 'express';
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import  todoRoutes from "./routes/todo";
import cors from "cors";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        message : "Hello from the server"
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://santhoshpemmaka:ygbqtxWRdusk1KKD@cluster0.qyzqtwb.mongodb.net/courses', { dbName: "courses" });
