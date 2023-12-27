const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParse.json());

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});

app.post('/sum', (req, res) => {
    const { num1,num2 } = req.body;
    if (!num1 || !num2) {
        return res.status(403).json({
            message : "Give all mandatory input fields"
        })
    }
    const result = Number(num1) + Number(num2);

    return res.status(200).json({
        result: result
    })
})

app.post('/principal-interest', (req, res) => {
    const { principal, time, rate } = req.body;
    if (!principal || !time || !rate) {
        return res.status(403).json({
            message : "Give all mandatory input fields"
        })
    }
    console.log(typeof principal)
    const interest = (principal * time * rate) / 100;
    const totalAmount = principal + interest;

    return res.status(200).json({
        interest: interest,
        totalAmount : totalAmount
    })
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
