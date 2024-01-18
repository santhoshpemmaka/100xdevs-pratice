const { Router } = require('express');
const { createTodo, updateTodo } = require('../type');
const router = Router();
const Todo = require('../models/todo');

router.post('/todo', async(req,res) => {
    const { title, description } = req.body;
    const parsePayload = createTodo.safeParse({
        title,
        description
    });
    if (!parsePayload.success) {
        return res.status(411).json({
            msg : "You sent the wrong inputs"
        })
    };
    try {
        const todo = await Todo.create({
            title: title,
            description: description
        });
        return res.status(201).json({
            msg: "todo is added sucessfully",
            id : todo._id
        })
    }
    catch (Err) {
        console.log("Error occured post /todo router");
        return res.status(500).json({
            msg : "Error occured in the sever"
        })
    }



});

router.get('/todos', async(req, res) => {
    try {
        const todos = await Todo.find({});
        return res.status(200).json({
            todos: todos
        });
    }
    catch (Err) {
        console.log("Error occured post /todos router");
        return res.status(500).json({
            msg : "Error occured in the sever"
        })
    }
});

router.get("/completed/:todoId", async(req, res) => {
    const todoId = req.params.todoId;
    if (!todoId) {
        return res.status(411).json({
            msg : "You sent the todo ID"
        })
    }
    try {
        await Todo.findOneAndUpdate({
            _id: todoId,    
        },
        {
            isCompleted : true
        },
        { new : true }
        )

        return res.status(200).json({
            msg : "Todo marked as completed"
        })
    }
    catch (Err) {
        console.log("Error occured post /todoID router");
        return res.status(500).json({
            msg : "Error occured in the sever"
        })
    }
    
})

module.exports = router;


