import nodemailer from "nodemailer"
import dotenv from "dotenv"
import Mail from "nodemailer/lib/mailer"
import { EmailData, sendEmail } from "../interfaces/emailInterface"

import db from "../models/index";
import { UserDetails } from "../models/user_details";
import { CreateUser, UserUpdate } from "../interfaces/userInterfaces";
import { AddressDetails } from "../models/user_address";
const { email } = db

dotenv.config()

export const transporter: Mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER, // Make sure .env has USER=youremail@gmail.com
        pass: process.env.MAIL_PASS, // and PASS=yourpassword or app password
    },
    secure: false,
})

export const retriveEmailData = async (messageType: string) => {
    const mailOption: EmailData | null = await email.findOne({ where: { type: messageType } })
    return mailOption
}

export class Service {
    static async getAllUserDetails() {
        return await UserDetails.findAll()
    }

    static async getUserById(userId: number) {
        const user = await UserDetails.findByPk(userId, {
            include: [{ model: AddressDetails, as: 'addresses' }],
        });
        return user
    }

    static async addNewUser(createUserReq: CreateUser, userProfilePath: string) {
        const { name, email, address, password, phone_no } = createUserReq
        const user = await UserDetails.create({ name, email, password, phone_no, user_profile: userProfilePath })
        await AddressDetails.create({ address, user_id: user.id })
        return
    }

    static async updateUser(updateDetails:UserUpdate){
        const user = await Service.getUserById(updateDetails.user_id)
        if(user) {
            await user.update(updateDetails)
            return "User updated"
        }

        else return "No user found"
    }
    static async deleteUser(userId:number){
        const user = await Service.getUserById(userId);
         if (!user) return "User not Found"
        const k= await user.destroy();
        console.log(k)
         return "User Deleted successfully"
    }

}