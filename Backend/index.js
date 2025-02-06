import express from 'express';
import { ENV_VARS } from './config/envVars.js';
import authRoutes from './routes/auth.route.js';
import connectDB from './config/db.js';

const app = express();
const port = ENV_VARS.PORT;

app.use(express.json());
app.use("/api/v1/auth", authRoutes);            // auth is a prefix/placeholder which contain all the routes form authRoutes i.e. /signIn, /signUp, /logOut

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    connectDB();
})