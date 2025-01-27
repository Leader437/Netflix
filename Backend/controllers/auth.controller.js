import User from "../models/user.model.js";

export const signIn = async (req, res) => {
    try {
        const { userName, password, email } = req.body

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
        if (password.length < 6) {
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

        // Creating New User in Database
        const newUser = new User({ userName, email, password, image }); // this will work fine since both the keys of object and the variable that i am assigning them have same name
        await newUser.save();

    } catch (e) {
        console.log("Error in SignIn: ", e.error);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    res.send("Sign Up Route");
}

export const logOut = async (req, res) => {
    res.send("Log Out Route");
}