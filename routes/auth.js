const express = require('express');
 const router = express.Router();
 const User = require('../models/User');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

//  User Registration
router.post('/register', async (req, res) => {
    try {
        console.log("I m here");
        const { username, password, email, phone } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone
        });
        await user.save();
        res.status(200).json({ message: 'User registred successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user){
            return res.status(404).json({ error: 'Username is not found.'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {

            return res.status(401).json({ error: 'Password is not correct.' });

        }

        const token = jwt.sign({ userId: user._id }, 'testing key', { expiresIn: '30s'});

        res.status(200).json({ token });

    } catch (error) {

        res.status(500).json({ error: 'Login faild' });

    }
});

module.exports = router;