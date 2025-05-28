import express from "express";
const router = express.Router();
import{getAllUser,createNewUser,updateUser, deleteUser}from '../controllers/userController'
import { get } from "http";
import upload from "../middlewares/fileUploadConfig";
/* GET users listing. */
router.get('/get-all-user',getAllUser );
router.post('/create-user',upload.single("profile"),createNewUser)
router.put('/update-user/',updateUser)
router.delete('/delete-user/:id',deleteUser)

export default router;
