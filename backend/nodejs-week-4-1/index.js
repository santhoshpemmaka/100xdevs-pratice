const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const problemRouter = require('./router/problems');
const userRouter = require('./router/user');

const mongooseURI = "mongodb+srv://santhoshpemmaka:ygbqtxWRdusk1KKD@cluster0.qyzqtwb.mongodb.net/meetcode";

const app = express();
app.use(bodyParser.json());
app.use(problemRouter);
app.use(userRouter)


app.use((err, req, res,next) => {
    console.log("Reached ---------------->")
    return res.status(404).json({
        message : "Not found!"
    })
})

mongoose.connect(mongooseURI).then(res => {
    app.listen(3000);
    console.log("Server is running on 3000");
})
.catch(err => {
    console.log("Error occured connect mongoose", err);
})

