'use client'
import { useState } from "react";


const Signin = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const btnHandler = async() => {
        const result = await fetch('http://localhost:3000/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                userName,
                password
            })
        });
        const response = await result.json();
        if (result.status == 200) {
            console.log(response)
        }
        else {
            console.log("Error occured in the signin page")
        }

    }
    return (
        <div className="h-screen w-[30%] mx-auto flex justify-center flex-col">
            <h3 className="text-2xl text-center mb-4">Signin page</h3>
            <label className="mb-2">Username</label>
            <input className="rounded mb-4 p-2 text-[14px] text-black" type='text' placeholder="Enter UserName" onChange={(e) =>setUsername(e.target.value)} />
            <label className="mb-2">Password</label>
            <input className="rounded mb-4 p-2 text-[14px] text-black" type='password' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="border p-2 rounded bg-blue-900 font-bold cursor-pointer" onClick={() => btnHandler()}>Signin</button>
        </div>
    )
}

export default Signin;