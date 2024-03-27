import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello from world!"
    })
});

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jwt.sign({ email }, "secret", { expiresIn: 3600 * 60 * 60 });
    res.cookie('token', token);
    return res.status(200).json({
        message: "Signin successfully!"
    })
});

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(411).json({
            message: "Invalid token"
        })
    }
    return res.status(200).json({
        name: "santhosh"
    })
});

app.post('/logout', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(411).json({
            message : "Invalid token"
        })
    }
    res.clearCookie('token');
    return res.status(200).json({
        message : "Logout successfull!"
    })
})


app.listen(3000, () => {
    console.log("Server is running on port", 3000);
})