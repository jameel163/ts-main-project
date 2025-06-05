import express from "express";

import userRoute from "./routes/users.route"
import emailRoutes from './routes/emailRoute'
import path from "path";
import swaggerUI from "swagger-ui-express";
import fs from 'fs'
import swaggerJsDocs from "swagger-jsdoc";
import yaml from 'yaml'
import YAML from "yamljs";

const app = express();





const swaggerPath = path.join(__dirname, '../swagger/index.yaml');
const swaggerDocs = YAML.load(swaggerPath);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use('/', userRoute);
app.use(emailRoutes);

app.use(express.static(path.join(__dirname,'../uploads')))
export default app;