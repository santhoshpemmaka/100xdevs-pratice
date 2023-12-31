const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
});


const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;