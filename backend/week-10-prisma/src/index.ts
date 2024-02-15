import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/index';

const prisma = new PrismaClient()
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(router);


app.listen(9000, () => {
    console.log("Server is running at", 3000)
});













// const insertUser = async (email: string, firstName: string, lastName: string) => {
//     const result = await prisma.user.create({
//         data: {
//             email,
//             firstName,
//             lastName
//         },
//         select: {
//             id: true
//         }
//     });
//     console.log("inser", result);
// };

// const insertTodo = async (title: string, description: string, userId: string) => {
//     const usertodo = await prisma.todo.create({
//         data: {
//             title,
//             description,
//             userId
//         },
//         select: {
//             id: true
//         }
//     });
//     console.log("usertodo", usertodo);
// }


// insertUser("santhosh@gmail.com", "santhosh", "pemmaka");
// insertTodo("go to gym", "go to gym daily", '65cd04d84b9646d8a2568c01');