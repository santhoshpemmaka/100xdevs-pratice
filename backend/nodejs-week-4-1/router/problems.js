const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const { Problem } = require('../models/problem');
const Submissions = require('../models/submission');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
});

router.post('/problems', authMiddleware, async(req, res) => {
    const userEmail = req.userEmail;
    const { problemId, title, difficulty, acceptance, description, exampleIn, exampleOut } = req.body;
    try {
        const user = await User.findOne({ email: userEmail });
        if (user.role != "admin") {
            return res.status(200).json({
                message : "You didn't have admin credentails, contact adminstrations"
            })
        }
        await Problem.create({
            problemId,
            title,
            difficulty,
            acceptance,
            description,
            exampleIn,
            exampleOut
        });
        return res.status(201).json({
            message : "Problem succesfully added"
        })
    }
    catch (err) {
        console.log("Error occured", err);
        return res.status(500).json({
            message: "Error occured in the server"
        })
    }
})

router.get('/problems/:id', async(req, res) => {
    const problemId = req.params.id;
    try {
        const problem = await Problem.findOne({ problemId: problemId });
        return res.status(200).json({
            data: problem
        })
    }
    catch (err) {
        console.log("Error occured", err);
    }
})

router.get('/problems', async (req, res) => {
    try {
        const problems = await Problem.find({});
        const result = problems.map(problem =>
        (
            {
                problemId: problem.problemId,
                difficulty: problem.difficulty,
                acceptance: problem.acceptance,
                title: problem.title
            }
        )
        )
        return res.status(200).json({
            problems: result
        })
    }
    catch (err) {
        console.log("Error occured ", err);
        return res.status(500).json({
            message: "Error occured in the server"
        })
    }
});

router.post('/submissions', authMiddleware, async(req, res) => {
    const { problemId, submissions } = req.body;
    try {
        const correct = Math.random() > 0.5;
        if (correct) {
            await Submissions.create({
                submissions: submissions,
                problemId: problemId,
                userId: req.userEmail,
                status: "Correct"
            })
            return res.status(200).json({
                status: "Correct"
            })
        }
        else {
            await Submissions.create({
                submissions: submissions,
                problemId: problemId,
                userId: req.userEmail,
                status : "Incorrect"
            })
            return res.status(200).json({
                status : "Incorrect"
            })
        }
    }
    catch (err) {
        console.log("Error occured", err);
        return res.status(500).json({
            message: "Error occured in the server"
        });
    }
})


router.get('/submissions/:problemId', authMiddleware ,async(req, res) => {
    const problemId = req.params.problemId;
    try {
        const userSubmissions = await Submissions.find({});
        const userResult = userSubmissions.filter((submission) => (
            submission.problemId == problemId && submission.userId == req.userEmail
        ));
        if (!userResult) {
            return res.status(200).json({
                message : "User didn't submit any solution"
            })
        }
        return res.status(200).json({
            submission : userResult
        })
    }
    catch (err) {
        console.log("Error occured", err);
        return res.status(500).json({
            message: "Error occured in the server"
        });
    }
})

module.exports = router;