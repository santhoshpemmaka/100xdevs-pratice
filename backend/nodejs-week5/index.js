const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const todoRouter = require('./router/todo');

const mognooseURI = "mongodb+srv://santhoshpemmaka:ygbqtxWRdusk1KKD@cluster0.qyzqtwb.mongodb.net/todo-list";

app.use(bodyParse.json());
app.use(cors());
app.use(todoRouter);

app.get("/", (req, res) => {
    console.log("-----reached");
    return res.status(200).json({
        healtht: "UP"
    })
});

mongoose.connect(mognooseURI).then(res => {
    console.log("Server is running port on 3000");
    app.listen(3000);
})
.catch(err => {
    console.log("Error occured mongoose", err);
})




