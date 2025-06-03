import express from "express";
const router = express.Router();
import{getAllUser,createNewUser,updateUser, deleteUser, uploadCSVController, htmlToPdf, }from '../controllers/userController'
import { verification } from "../middlewares/auth"; 
import uploadImage from "../middlewares/imageUploadConfig";
import fileUpload from "../middlewares/fileUploadConfig";
import { validate } from "../middlewares/schemaValidation";
import { createUserSchema } from "../schemas/userSchema";
/* GET users listing. */
router.get('/get-all-user',verification,getAllUser );
router.post('/create-user',uploadImage.single("profile"),validate(createUserSchema),createNewUser)
router.post('/create-users-by-csv',fileUpload.single("csv"),uploadCSVController)
router.put('/update-user/',updateUser)
router.delete('/delete-user/:id',verification,deleteUser)


router.post('/convert-html-topdf',fileUpload.single('htmlfile'),htmlToPdf)
export default router;
