import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json())
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin : "http://localhost:3000"
}));

app.post('/sign', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jwt.sign({ userId: email }, 'secret');
    res.cookie('token', `Bearer ${token}`,{ expires : new Date(Date.now() + 3600000* 24), httpOnly:true });
    res.status(200).json({
        token : token
    })
})


app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Server is up..."
    })
});

app.get('/user', (req, res) => {
    console.log("cookies", req.cookies);
    const token = req.cookies.token;
    console.log("token", token);
    return res.status(200).json({
        message :token
    })
})

app.post('/logout', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(200).json({
            message : "token is not there!"
        })
    }
    res.clearCookie('token');
    return res.status(200).json({
        message : "Cookie is removed"
    })
})

app.listen(3001, () => {
    console.log("Server is running on 3001");
})