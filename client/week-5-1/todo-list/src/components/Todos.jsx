import React from 'react';

const Todos = ({ todos }) => {
    const markHandler = async(id) => {
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