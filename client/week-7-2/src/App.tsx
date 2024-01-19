import { useState } from 'react'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Todolist,  FilterText, FilterTodo } from './context/RecoilContext';
function App() {
  return (
    <RecoilRoot>
          <TodoList />
          <FilterInput />
          <DisplayTodo />
    </RecoilRoot>
  )
}

export default App;

interface TodoListType {
    title: string,
    description : string
}

const TodoList = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [todoList, setTodoList] = useRecoilState<TodoListType[] | any>(Todolist);
    const buttonHandler = () => {
        const updateResult = [...todoList, { title, description }];
        if (updateResult) {
            setTodoList(updateResult);
        }
        setDescription('');
        setTitle('');
        
    }
    return (
        <div>
            <h2>TodoList</h2>
            <input className='input-tag' value={title} type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Enter title text' />
            <input className='input-tag'  value={description} type="text" onChange={(e) => setDescription(e.target.value)} placeholder='Enter title text' />
            <button className='button-tag' onClick={() => buttonHandler()}>ADD TO TODO</button>
        </div>
    )
}

interface todo {
    title: string,
    description : string
}

const DisplayTodo = () => {
    const todoList = useRecoilValue(FilterTodo);
    console.log("re-render DisplayTOdo");
    return (
        <>
            <h2>DisplayTodo</h2>
            {todoList && todoList?.map((todo:todo) => (
                <div key={todo.title} className='card'>
                    <p>title : {todo.title}</p>
                    <p>description: {todo.description}</p>
                </div>
            ))}
        </>
    )
}

const FilterInput = () => {
    const setFilter = useSetRecoilState(FilterText);
    console.log("re-render FilterINput");
    const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }
    return (
        <div>
            <input className='input-tag1' onChange={(e) => filterHandler(e)} type="text" placeholder='Enter text' />
        </div>
    )
}
