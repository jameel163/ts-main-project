import express from "express";

import userRoute from "./routes/users.route"
import emailRoutes from './routes/emailRoute'
import path from "path";

const app = express();
app.use(express.json());
app.use('/', userRoute);
app.use(emailRoutes);

app.use(express.static(path.join(__dirname,'../uploads')))
export default app;