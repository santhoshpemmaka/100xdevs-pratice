import React, { useState } from 'react';

const CreateTodo = () => {
    const [userTodo, setuserTodo] = useState({
        title: "",
        description: "",
        isCompleted: false
    })
    const inputHandler = (e:React.ChangeEvent<HTMLInputElement>, type:string) => {
        setuserTodo(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    };

    const btnHandler = async() => {
        const response = await fetch("https://one00xdevs-todo.onrender.com/todo",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title: userTodo.title,
                description: userTodo.description,
                isCompleted : userTodo.isCompleted
            })
        })
        await response.json();
        if (response.status == 200 || response.status == 201) {
            window.location.reload();
        }
    }
    return (
        <div className='todo-component'>
            <input className='todo-input' type="text" value={userTodo.title} placeholder='title' onChange={(e) => inputHandler(e,"title")} required />
            <br />
            <input className='todo-input' type="text" value={userTodo.description} placeholder='description' onChange={(e) => inputHandler(e,"description") } required />
            <br />
            <button onClick={() => btnHandler()}>Add a todo</button>
        </div>
    )
};

export default CreateTodo;