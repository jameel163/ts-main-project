import { Request,Response } from "express";
import  db  from "../models/index";
import { retriveEmailData, transporter } from "../services/sequelize.service";
const {email}=db

import { EmailData,sendEmail,emailRes, errorResponse } from "../interfaces/emailInterface";


export const EmailSender=async(req:Request,res:Response):Promise<void>=>{
    const data:sendEmail=req.body
    console.log(req.body)
    try{

        //const mailOption:EmailData|null=await email.findOne({where:{type:data.type}})
        const mailOption:EmailData|null=await retriveEmailData(data.type)  

        if(!mailOption){
            res.status(401).send("No Mail Template found with this type")
        }
        res.send(mailOption)
        
        transporter.sendMail({text:mailOption?.html,subject:mailOption?.subject,to:data.to},(error,info)=>{
            if(error){
                res.status(500).send(error)
            }
            const response:emailRes={
                message:"Email sended successfuly",
                info:info
            }
            res.status(201).json(response).send()
        })
    }
    catch (err) {
    const response: errorResponse = {
      message: "Server Error",
      error: err as Error,
    };
    res.status(500).json(response);
  }
}