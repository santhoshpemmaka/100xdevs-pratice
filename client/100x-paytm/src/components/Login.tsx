import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [userInfo, setuserInfo] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const inputHandler = (e:React.ChangeEvent<HTMLInputElement>, tag:string) => {
        setuserInfo(prev => ({...prev, [tag]:e.target.value}))
    }

    const submitHandler = async() => {
        const url = `http://localhost:3000/api/v1/user/signin`;
        const response = await fetch(url, {
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
            const token = result.token;
            localStorage.setItem("token", `Bearer ${token}`);
            navigate('/')
        }
    }
  return (
    <div className='w-2/6 mx-auto bg-white rounded py-4'>
    <h1 className='text-4xl py-4 text-center font-bold '>Sign In</h1>
    <p className='my-0 text-center text-lg opacity-50'>Enter your credentials to access your account</p>
    <div className='mx-8 mt-4'>
        <h6 className='text-lg'>Email</h6>
        <input type='text' className='w-full my-2 py-2 px-1 border-2 rounded border-[#eee] outline-none' onChange={(e) => inputHandler(e,"email")} placeholder='Enter email id' />
    </div>
    <div className='mx-8 mt-4'>
        <h6 className='text-lg'>Password</h6>
        <input type="password" className='w-full my-2 py-2 px-1 border-2 rounded border-[#eee] outline-none' onChange={(e) => inputHandler(e,"password")} placeholder='Enter password' />
    </div>
    <button onClick={() => submitHandler()} className='mx-7 bg-black w-[90%] py-3 rounded my-3 text-white text-xl'>Sign In</button>
    <p className='mx-8 text-center'>Already have an account? <Link to="/signup" className='underline'>Signup</Link></p>
    </div>      
  )
}

export default Login