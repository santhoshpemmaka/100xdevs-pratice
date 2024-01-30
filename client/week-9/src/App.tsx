import { useEffect, useState } from 'react'
import axios from 'axios'

type Todo = {
    title: string,
    description : string
}

const useTodo = (seconds : number) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let timerId = setInterval(() => {
              axios.get("https://sum-server.100xdevs.com/todos")
                    .then(res => {
                        setTodos(res.data.todos);
                        setLoading(false);
            })
        },seconds*1000)
        return () => {
            clearInterval(timerId)
        }
        
    }, [seconds]);

    return { todos, loading };
}

const useIsOnline = () => {
    const [isOnline, setisOnline] = useState(window.navigator.onLine);
    useEffect(() => {
        window.addEventListener('online', () => {
            setisOnline(true);
        })
        window.addEventListener('offline', () => {
            setisOnline(false);
        });
        return () => {
            window.removeEventListener('online', () => { });
            window.removeEventListener('offline', () => { });
        }
    },[])
    

    return isOnline;
}

const useMousePointer = () => {
    const [mousePointer, setmousePointer] = useState({
        x: 0,
        y: 0
    });
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            setmousePointer({ x: e.clientX, y: e.clientY });
        });
        console.log("useeffect called")
        return () => {
            window.removeEventListener('mousemove', (e) => {
                setmousePointer({ x: e.clientX, y: e.clientY });
            })
        }
    }, []);
    return mousePointer;
}
interface MousePointer  {
    x: number,
    y:number
}

const useDebounce = (inputValue: string, timeout: number): any => {
    const [debounceValue, setdebounceValue] = useState('');
    useEffect(() => {
        let timerout = setTimeout(() => {
            setdebounceValue(inputValue);
        }, timeout);
        return () => {
            clearTimeout(timerout);
        }
    }, [inputValue]);
    return debounceValue;
}


function App() {
  
    // const { todos, loading } = useTodo(5);
    const isOnline = useIsOnline();
    // const mousePointer: MousePointer = useMousePointer();
    const [inputValue, setinputValue] = useState('');
    // console.log(todos);
    const debounceValue  = useDebounce(inputValue, 2000);
    return (
        <>
            {/* {loading ? <div>loading...</div> : todos.map((todo) => <Track todo={todo} />)} */}
            {isOnline ? <>Online</> : <>Offline</>}
            {/* <p>{mousePointer.x},{mousePointer.y}</p> */}
            <p>Debounced value is {debounceValue}</p>
            <input type='text' value={inputValue} onChange={e => setinputValue(e.target.value)} placeholder='enter search word' />
        </>
    )
}

interface TodoList  {
    todo : Todo
}

function Track({ todo }:TodoList) {
  return <div>
    {todo.title}
    <br />
    {todo.description}
  </div>
}

export default App