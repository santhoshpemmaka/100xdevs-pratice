import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { userLoginSelector } from '../utils/atom';

const Header = () => {
    const loginStatus = useRecoilValue(userLoginSelector);
    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
  return (
    <div className='p-4 flex justify-between border-b-[1px] border-[#e6e6e6]'>
          <div>
              <Link to="/">
                <h1 className='text-white text-2xl font-bold'>100x-Paytm</h1>
              </Link>
              
          </div>
          {loginStatus ? <div>
              <h2 className='text-white text-xl inline-block pr-4'>Hi, User</h2>
              <button className='text-white text-xl pr-4 underline' onClick={() => logoutHandler()}>Logout</button>
          </div>
              : 
              <div>
              <Link to="/signin" className='text-xl text-white pr-4 underline'>
                  Login
              </Link>
              <Link to="/signup" className='text-xl text-white pr-4 underline' >
                  Signup
              </Link>
        </div> 
        }
           
    </div>
  )
}

export default Header