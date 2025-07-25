import  User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try{
        console.log("Incoming request body:", req.body);

        //hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });
        await newUser.save();
        res.status(200).json({success: true, message: "User registered successfully"});
    } catch (err){
        res.status(500).json({success: false, message: "User registration failed", error: err.message});
    }
}

export const login = async (req, res) => {

    const email = req.body.email

    try{
        const user = await User.findOne({ email });
        // If user not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({ success: true, message: "User logged in successfully", data: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        } });
    } catch (err) {
        res.status(500).json({ success: false, message: "User login failed", error: err.message });
    }
};