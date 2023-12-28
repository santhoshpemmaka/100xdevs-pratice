const { Router } = require('express');
const zod = require('zod');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const JWTSECRET = "secret";

router.post('/signup', async(req, res) => {
    const { email, password, role } = req.body;
    const userEmailSchema = zod.string().email();
    const checkUserEmail = userEmailSchema.safeParse(email);
    try {
        if (!checkUserEmail.success || !password) {
            return res.status(403).json({
                message : "Provide all input fileds"
            })
        };
        await User.create({
            email: email,
            password: password,
            role: role ? "admin" : "user"
        });
        return res.status(201).json({
            message : "User Created"
        })
    }
    catch (err) {
        console.log("Error", err);
        return res.status(500).json({
            message :"Error occured in server"
        })
    }
    

})

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!email || !password) {
            return res.status(403).json({
                message : "Provide all input fields"
            })
        }
        if (user.password != password) {
            return res.status(403).json({
                message : "Provide correct crendentials"
            })
        }
        const token = jwt.sign({
            email: email,
            password: password
        }, JWTSECRET);

        return res.status(200).json({
            token : token
        })

    }
    catch (err) {
        console.log("Error", err);
        return res.status(500).json({
            message : "Error occured on server"
        })
    }
})

router.get('/me', authMiddleware, async(req, res) => {
    try {
        const userEmail = req.userEmail;
        const user = await User.findOne({ email: userEmail });
        return res.status(200).json({
            userEmail: user.email,
            id : user._id
        })
    }
    catch (err) {
        console.log("Error occured", err);
    }
})




module.exports = router;