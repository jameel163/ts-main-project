import express from "express";
const router = express.Router();
import{getAllUser,createNewUser,updateUser, deleteUser}from '../controllers/userController'
import { verification } from "../middlewares/auth"; 
import upload from "../middlewares/fileUploadConfig";
import { validate } from "../middlewares/schemaValidation";
import { createUserSchema } from "../schemas/userSchema";
/* GET users listing. */
router.get('/get-all-user',verification,getAllUser );
router.post('/create-user',upload.single("profile"),validate(createUserSchema),createNewUser)
router.put('/update-user/',updateUser)
router.delete('/delete-user/:id',verification,deleteUser)

export default router;
