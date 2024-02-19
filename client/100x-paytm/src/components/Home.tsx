import React,{useState, useEffect} from 'react'
import { useRecoilValue } from 'recoil';
import { userLoginSelector } from '../utils/atom';
interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string
}
const Home = () => {
    const [userArray, setuserArray] = useState([]);
    const [searchText, setsearchText] = useState('');
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectUser, setselectUser] = useState<User>();
    const [transferAmount, settransferAmount] = useState<number>();
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:3000/api/v1/user/bulk?filter=${searchText}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'authorization': localStorage.getItem("token") ?? ""
                }
            });
            const result = await response.json();
            if (response.status == 200) {
                setuserArray(result.users);
            }
        }
        const fetchAmount = async () => {
            const response = await fetch(`http://localhost:3000/api/v1/account/balance`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'authorization': localStorage.getItem("token") ?? ""
                }
            });
            const result = await response.json();
            if (response.status == 200) {
                setAmount(result.balance)
            }
        }
        fetchUser();
        fetchAmount();
    },[searchText, open])

    const transferHandler = async() => {
        const response = await fetch(`http://localhost:3000/api/v1/account/transfer`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'authorization': localStorage.getItem("token") ?? ""
            },
            body: JSON.stringify({
                to: selectUser?.id,
                amount: transferAmount
            })
        });
        const result = await response.json();
        if (response.status == 200) {
            setOpen(false);
        }
    }
    return (
      <>
        {open ? 
            <div className='modal'>
                <div className='modal-container rounded'>
                    <h2 className='text-center text-2xl font-bold py-4'>Send Money</h2> 
                    <h3 className='ml-8 py-2 text-xl'>{selectUser?.firstName}</h3>
                    <span className='block py-2 ml-8 text-sm'>Amount (in $)</span>  
                    <input className='block ml-8 border-2 w-[90%]  my-1 p-1 rounded outline-none'  placeholder='Enter amount' onChange={(e) => settransferAmount(Number(e.target.value))}/>
                        <button className='block ml-8 bg-indigo-500 text-white p-2 mt-4 rounded font-bold w-[90%]' onClick={() => transferHandler()}>Initiate Transfer</button>    
                        <button className='block ml-8 bg-indigo-500 text-white p-2 mt-4 rounded font-bold w-[90%]' onClick={() => setOpen(false)}>close</button>
                </div>
            </div> 
        : 
        <div className='mt-4 ml-8 pl-8'>
            <h2 className='text-white  text-[24px]'><span className='font-bold pr-6'>Your Balance</span>$ {amount}</h2>
            <div className='mt-4'>
                <h2 className='text-white text-[24px] mb-4'>Users</h2>
                <input type='text' onChange={(e) => setsearchText(e.target.value)} className='w-[95%] py-3 px-4 rounded'  placeholder='Search by firstName/lastName'/>
            </div>
            {userArray && userArray?.length > 0 && userArray.map((user:User) => (
                <div className='flex justify-between m-8 ml-0 last:mb-0 last:pb-4' key={user.id}>
                    <div>
                        <span className='text-white inline-block w-[50px] h-[50px] rounded-full bg-gray-400 text-center pt-3 font-bold'>{`U${user.id}`}</span>
                        <span className='text-white pl-4 text-xl'>{user.firstName}</span>
                    </div>
                    <div className='mr-8'>
                        <button className='bg-indigo-500 text-white p-3 rounded font-bold' onClick={() => { setOpen(true),setselectUser(user)}}>Send Money</button>
                    </div>
                </div>
            )) }
        </div>
      }
        
      </>
  )
}

export default Home