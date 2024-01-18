import { useRouter } from 'next/router';
import React, { useState } from 'react';


const Login = () => {
    const [userInfo, setuserInfo] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        setuserInfo(prev => ({
            ...prev,
            [type]: e.target.value
        }))
    };
    const btnHandler = async() => {
        const response = await fetch("https://meetcode-y2yz.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userInfo.email,
                password: userInfo.password
            })
        });
        const result = await response.json();
        if (response.status == 200) {
            localStorage.setItem("token", `Bearer ${result.token}`);
            router.push("/");
        }
    }
    return (
        <div className='signup-container'>
            <div className='signup-component'>
                <h1>Login</h1>
                <div className='signup-input'>
                    <label>Email:</label>
                    <input type="email" value={userInfo.email} onChange={(e) => inputHandler(e, "email")}  placeholder='Enter your e-mail Id' />
                </div>
                <div className='signup-input'>
                    <label>Password:</label>
                    <input type="password" value={userInfo.password} onChange={(e) => inputHandler(e, "password")} placeholder='Enter your password' />
                </div>
                <button onClick={() => btnHandler()}>Login</button>
            </div>
        </div>
    )
}

export default Login;