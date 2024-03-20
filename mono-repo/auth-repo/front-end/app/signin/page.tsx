'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signin = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const btnHandler = async() => {
        const response = await fetch("http://localhost:3001/sign", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-Type': "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const result = await response.json();
        if (response.status == 200) {
            router.push('/')
        }
    }

    const logoutHandler = async() => {
        const response = await fetch("http://localhost:3001/logout", {
            method: 'POST',
            credentials: 'include'
        })
    }

  return (
      <div className='flex flex-col w-[50%] mx-auto mt-8'>
          <input className='my-4 p-2 rounded text-black' type ="text"  placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
          <input className='my-4 p-2 rounded text-black' type='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
          <button className='w-[200px] border rounded py-2 hover:bg-white hover:text-black ' onClick={() => btnHandler()}>Login</button>
          <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Signin;