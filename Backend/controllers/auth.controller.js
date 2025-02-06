// import { response } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// Writting the Code of the Authentication Routes
export const signUp = async (req, res) => {
    try {
        const { userName, password, email } = req.body;

        // Checking the availability of data
        if (!userName || !password || !email) {
            return res.status(400).json({ success: false, error: "Error! Unable to get complete user Information" });
        }

        // Checking Email format validity
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: "Invalid email" });
        }

        // Checking Password Length
        if (String(password).length < 6) {
            return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
        }

        // Checking if UserName already exists
        const existingUserByName = await User.findOne({ userName: userName });
        if (existingUserByName) {
            return res.status(400).json({ success: false, error: "Username already Taken" });
        }

        // Checking if Email already exists
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, error: "Account already exists on this Email Address" });
        }

        // assigning a random profile pic from the 3 available options
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating New User in Database
        const newUser = new User({ userName, email, password: hashedPassword, image });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        console.log("User Created Successfully");

        res.status(201).json({ success: true, data: {   // so that we don't send the password in response
            userName: newUser.userName,
            email: newUser.email,
            image: newUser.image
        }});

    } catch (e) {
        console.log("Error in SignUp: ", e.error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

export const signIn = async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        
        // Checking the availability of data
        if (!password || !email) {
            return res.status(400).json({ success: false, error: "Error! Unable to get complete Login Information" });
        }

        // Checking Email availability in database
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ success: false, error: "Invalid Credentials" });
        }

        // Checking Password
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, error: "Invalid Credentials" });
        }

        generateTokenAndSetCookie(existingUser._id, res);

        res.status(200).json({ success: true, data: {   // so that we don't send the password in response
            userName: existingUser.userName,
            email: existingUser.email,
            image: existingUser.image
        }});

    } catch (error) {
        console.log("Error in SignIn: ", error.error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("netflix_jwt");
        res.status(200).json({ success: true });
    } catch (error) {
        console.log("Error in LogOut: ", error.error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}