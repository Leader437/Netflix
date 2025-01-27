import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

const connectDB = () => {
    mongoose.connect(ENV_VARS.MONGO_URI)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.error('Error connecting to MongoDB:', err); });
}

export default connectDB;