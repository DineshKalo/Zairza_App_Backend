const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Registering a new user
router.post('/register', async (req, res) => {
    const { first_name, last_name, registration_number, branch, phone_number, email, password, batch } = req.body;
    try {
        if (!password || password.trim().length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate Zairza ID
        const userCount = await User.countDocuments({ batch });
        const randomDigits = Math.floor(Math.random() * 1000);
        const zairzaID = `ZA${batch.toString().slice(-2)}I${(userCount + 1).toString().padStart(3, '0')}${randomDigits.toString().padStart(3, '0')}`;

        // Create a new user
        const newUser = new User({
            first_name,
            last_name,
            registration_number,
            branch,
            phone_number,
            email,
            password: hashedPassword,
            zairza_id: zairzaID,
            batch
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logging in a user
router.post('/login', async (req, res) => {
    const { input, password } = req.body;
    try {
        if (!password || password.trim().length === 0) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let user;

        if (emailRegex.test(input)) {
            user = await User.findOne({ email: input });
        } else {
            user = await User.findOne({ zairza_id: input });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                zairza_id: user.zairza_id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
