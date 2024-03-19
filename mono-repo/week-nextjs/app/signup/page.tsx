'use client'

import { useState } from "react";

const Signup = () => {
    const [firstName, setFirstname] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const btnHandler = async() => {
        const response = await fetch("http://localhost:3000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                firstName,
                userName,
                password
            })
        });
        const result = await response.json();
        if (response.status == 200) {
            console.log("result", result);
        }
    }
    return (
        <div className="h-screen w-[30%] mx-auto flex justify-center flex-col">
            <h3 className="text-2xl text-center mb-4">Signup page</h3>
            <label className="mb-2">Firstname</label>
            <input className="rounded mb-4 p-2 text-[14px] text-black " type='text' placeholder="Enter FirstName" onChange={(e) => setFirstname(e.target.value)} />
            <label className="mb-2">Username</label>
            <input className="rounded mb-4 p-2 text-[14px] text-black" type='text' placeholder="Enter UserName" onChange={(e) => setUsername(e.target.value)} />
            <label className="mb-2">Password</label>
            <input className="rounded mb-4 p-2 text-[14px] text-black" type='password' placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="border p-2 rounded bg-blue-900 font-bold cursor-pointer" onClick={() => btnHandler()}>Signin</button>
        </div>
    )
}

export default Signup;