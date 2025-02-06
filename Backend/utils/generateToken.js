import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (id, res) => {
    let token = jwt.sign({ id }, ENV_VARS.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("netflix_jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,   // httpOnly is used to prevent XSS attacks by not allowing the client side javascript to access the cookie
        sameSite: "strict",   // is used to prevent CSRF attacks
        secure: ENV_VARS.ENVIRONMENT != "Development",     // set to true means means cookie will only be sent over HTTPS and we don't have https on development localhost
    });

    return token;
}