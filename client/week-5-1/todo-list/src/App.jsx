import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
    const [todoList, settodoList] = useState([]);

    useEffect(() => {
        const getTodo = async () => {
            const response = await fetch("https://one00xdevs-todo.onrender.com/todos");
            const result = await response.json();
            console.log("result", result);
            settodoList(result.todos);
        }
        getTodo();
    },[])

  return (
      <div className='app-componet'>
          <h2>Todo list</h2>
          <CreateTodo />
          <Todos todos={todoList}/>
      </div>
  )
}

export default App
