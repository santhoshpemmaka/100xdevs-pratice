// write a function to create a users table in your database.
import { Client } from 'pg'
 
const client = new Client({
  connectionString: "postgresql://santhosh.pemmaka:PHDZzb2q5JIQ@ep-wandering-violet-a1iwi90g.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

// async function createUsersTable() {
//     await client.connect()
//     const result = await client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `)
//     console.log(result)
// }

// createUsersTable();


// const insertUserData = async (username: string, password: string, email:string) => {
//     await client.connect()
//     // SQL Injection
//     const result = await client.query(`
//         INSERT INTO users (username, password, email) 
//         VALUES ($1,$2,$3); 
//     `, [username, password, email]);

//     console.log(result);

// }

// insertUserData("santhosh1", "pemmaka1", "santhosh1@gmail.com");


