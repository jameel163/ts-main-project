import express from "express";
const router = express.Router();

import { EmailSender } from "../controllers/emailController";

router.post('/sendmail',EmailSender)


export default router;
