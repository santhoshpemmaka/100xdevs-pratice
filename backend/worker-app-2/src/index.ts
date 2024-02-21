import  Express  from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import routes from './routes/index';

const app = Express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", routes);

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "worker app 1"
    })
});


app.listen(3000, () => {
    console.log("server is running on", 3000);
})