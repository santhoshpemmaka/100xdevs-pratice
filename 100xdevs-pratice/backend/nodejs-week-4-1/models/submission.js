const mongoose = require('mongoose');


const submissionSchema = new mongoose.Schema({
    submissions: String,
    problemId: String,
    userId: String,
    status: String
});

const Submissions = mongoose.model("submission", submissionSchema);

module.exports = Submissions;