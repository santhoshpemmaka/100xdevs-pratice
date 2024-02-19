import Express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'
import routes from './routes/index';

const app = Express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req:Request, res: Response) => {
    return res.status(200).json({
        message : "Hello from server"
    })
})

app.use("/api/v1",routes);



app.listen(3000, () => {
    console.log("Server is running on port", 3000);
})