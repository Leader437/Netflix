import mongoose from "mongoose";

const User = mongoose.models.User || mongoose.model('User', {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    searchHistory: { type: Array, default: [] }
});

export default User;