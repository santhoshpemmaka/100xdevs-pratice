const express = require('express');
const bodyParsed = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParsed.json());

const userObject = [
    {
        email: "asdf@gmail.com",
        password: "12345",
        role: "admin"
    },
    {
        email: "asdf1@gmail.com",
        password: "12345",
        role : "user"
    }
]

app.post('/signup', (req, res) => {
    const body = req.body;
    const userRole = req?.query?.role;
    const findIndex = userObject.findIndex(user => user.email == body.email);
    if (findIndex == -1) {
        let newUser = {
            email: body.email,
            password: body.password,
            role : userRole ? "admin" : "user"
        }
        userObject.push(newUser);
        return res.status(200).json({
            message: "User sucessfully created!"
        })
    }
    else {
        return res.status(401).json({
            message: "User email already exists. Please try other email id"
        })
    }
});

app.post('/login', (req, res) => {
    const body = req.body;
    const findIndex = userObject.findIndex(user => user.email == body.email);
    if (findIndex != -1) {
        return res.status(200).json({
            message: "Login is sucessfully!",
            token: "newtoken_assdggh"
        });
    }
    else {
        return res.status(401).json({
            message: "Your email/password is incorrect. Please try once again!"
        })
    }
});

const questions = [
    {
        text: "What is the sum of 2+2?",
        description: "The sum of the 4",
        tests: [
            {
                questions : "What is the sum of 4?"
            }
        ]
    },
    {
        text: "What is the sum of 4+4?",
        description: "The sum of the 16",
        tests: [
            {
                questions : "What is the sum of 4?"
            }
        ]
    },
    {
        text: "What is the sum of 8+8?",
        description: "The sum of the 16",
        tests: [
            {
                questions : "What is the sum of 4?"
            }
        ]
    }
]

app.get('/questions', (req, res) => {
    if (questions?.length) {
        return res.status(200).json({
            "result" : questions
        })
    }
    else {
        return res.status(402).json({
            "message" : "Error occured in the /questions in the router"
        })
    }
})

const submissions = [
    {
        question : "what is the command of the install express in the nodeJs project?"
    },
    {
        question : "what is the command of the install nodemon in the nodeJs project?"
    },
]

app.post('/submissions', (req, res) => {
    const body = req.body;
    if (body.question) {
        submissions.push({ question: body.question });
        res.status(200).json({
            message: "question submisstion successfully!"
        })
    }
    else {
        res.status(401).json({
            message: "Please submit question"
        })
    }
});


app.post('/add-questions/:role', (req, res) => {
    const body = req.body;
    const role = req?.params?.role ?? null;
    if (role == "admin") {
        questions.push({
            text: body.text,
            description: body.description,
            test : []
        })
        return res.status(200).json({
            message : "Succesfully added question!"
        })
    }
    else {
        return res.status(401).json({
            message : "You didn't have admin roles. Please contact to the admin team"
        })
    }
})

app.listen(PORT, () => {
    console.log("Server is running on the", PORT);
})


// Object store.
// User singup -post body email and password add into user object.
// user login -post body email and password return 200 status code.
// questions - get hard code response.
// submissions - post