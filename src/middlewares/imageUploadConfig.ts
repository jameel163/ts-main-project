import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";


const storage= multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb){
        cb(null,'./uploads/')
    },
    filename:function(req:Request,file:Express.Multer.File,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const fileFilter=(req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
    const allowedTypes = /jpeg|jpg|png/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) cb(null, true);
    else cb(new Error('Only image files are allowed!'));
}

const uploadImage= multer({ storage: storage, fileFilter: fileFilter,limits:{fieldSize: 5 * 1024 * 1024} });

export default  uploadImage