const mongoose = require('mongoose');


const problemSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
    },
    title: String,
    difficulty: String,
    acceptance: String,
    description: String,
    exampleIn: String,
    exampleOut: String
});

const Problem = mongoose.model("problem", problemSchema);

module.exports = {
    Problem
}
