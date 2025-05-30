import express from "express";


import userRoute from "./routes/users"
import emailRoutes from './routes/emailRoute'

const app = express();
app.use(express.json());
app.use('/', userRoute);
app.use(emailRoutes);

export default app;