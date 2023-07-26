import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AccountModel } from '../models/AccountModel.js';

const accountRouter = express.Router();

// Login
accountRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    const account = await AccountModel.findOne({ email });

    if (!account) {
        return res.status(404).json({ message: "This email is not found" });
    }

    const valid = await bcrypt.compare(password, account.password);

    if (!valid) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    try {
        const token = jwt.sign({ id: account._id }, "secret");
        return res.status(200).json({ id: account._id });
    } catch (error) {
        return res.status(401).json({ message: "Login failed" });
    }

});

// Create new account
accountRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    // Check if the email was already used to register
    const account = await AccountModel.findOne({ email });

    if (account) {
        return res.status(400).json({ message: "This email was already used to register" });
    }

    // Create new account if not existed
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = AccountModel({ email, password: hashedPassword });
    try {
        await newAccount.save();
        return res.status(201).json({ id: newAccount._id })
    } catch (error) {
        return res.status(401).json({ message: "Registration failed" });
    }
});



export { accountRouter };