import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://santhosh.pemmaka:WUYe4m0QMCNX@ep-noisy-dawn-a55afhon.us-east-2.aws.neon.tech/neondb?sslmode=require"
});




const createUsersTable = async () => {
    await client.connect();
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log(result);
};

const insertTable = async () => {
    try {
        await client.connect();
        const result = await client.query(`
            INSERT  INTO users (
                username, email, password
            ) VALUES ('santhosh123','santhosh@gmail.com','12345')
        `);
        console.log("Insertion successfully", result);
    }
    catch (err) {
        console.log("Error occured", err);
    }
    // try {
    //     await client.connect(); // Ensure client connection is established
    //     const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
    //     const res = await client.query(insertQuery);
    //     console.log('Insertion success:', res); // Output insertion result
    //   } catch (err) {
    //     console.error('Error during the insertion:', err);
    //   } finally {
    //     await client.end(); // Close the client connection
    // }
    
}

insertTable();