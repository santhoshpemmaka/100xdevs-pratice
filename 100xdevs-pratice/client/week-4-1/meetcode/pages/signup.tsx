import React,{useState} from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
    const [userInfo, setuserInfo] = useState({
        email: '',
        password :''
    })
    const router = useRouter();
    const [errorInfo, seterrorInfo] = useState('');
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        seterrorInfo('')
        setuserInfo(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    }
    const submitHandler = async() => {
        if (userInfo.email == '' || userInfo.password == '') {
            seterrorInfo("Provide all mandatory fields")
        }
        const response = await fetch("https://meetcode-y2yz.onrender.com/signup", {
            method: 'POST',
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
            router.push('/')
        }
    }
    return (
        <div className='signup-container'>
            <div className='signup-component'>
                <h1>Signup</h1>
                <div className='signup-input'>
                    <label>Email:</label>
                    <input type="email" value={userInfo.email} onChange={(e) => inputHandler(e,"email") } placeholder='Enter your e-mail Id' />
                </div>
                <div className='signup-input'>
                    <label>Password:</label>
                    <input type="password" value={userInfo?.password} onChange={(e) => inputHandler(e,"password") }  placeholder='Enter your password' />
                </div>
                {errorInfo.length > 0 && <p className='error-info'>* {errorInfo}</p>}
                <button onClick={() => submitHandler()}>Signup</button>
                
            </div>
        </div>
    )
}

export default Signup;