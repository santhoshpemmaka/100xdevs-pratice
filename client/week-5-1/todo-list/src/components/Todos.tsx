import React from 'react';

interface TodoList {
    _id: string,
    title: string,
    description: string,
    isCompleted: boolean
}

const Todos = ({ todos } : {todos:TodoList[]}) => {
    const markHandler = async(id:string) => {
        const response = await fetch(`https://one00xdevs-todo.onrender.com/completed/${id}`);
        await response.json();
    }
    return (
        <div>
            {todos && todos?.length > 0 && todos.map(todo => (
                <div key={todo._id} className='todos-component'>
                    <h3>{todo.title}</h3>
                    <h4>{todo.description}</h4>
                    <p>{todo.isCompleted == true ? "Completed" : "Is not Completed"}</p>
                    <button onClick={() => markHandler(todo._id)}>Mark as completed</button>
                </div>
            )) }   
        </div>
    )
}

export default Todos;