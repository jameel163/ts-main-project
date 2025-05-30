import { Request, Response } from "express";
import db from '../models/index'
import { User, CreateUser, UserUpdate, AddressAttributes, UserAttributes } from "../interfaces/userInterfaces";
import { body } from "express-validator";
import fs from "fs";
import path from "path";
import Jwt from "jsonwebtoken";
const { UserDetails, AddressDetails } = db

import { Service } from "../services/email";
const serviceInstance = new Service()

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users: User[] = await Service.getAllUserDetails()
    res.send(users)
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export const createNewUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const createUserReq: CreateUser = req.body

    const userProfilePath = req.file ? req.file.filename : "";


    const { name, email, address, password, phone_no } = createUserReq
    // const user = await UserDetails.create({ name, email, password, phone_no,user_profile })
    // await AddressDetails.create({ address, user_id: user.id })
    await Service.addNewUser(createUserReq, userProfilePath)

    const token = Jwt.sign({
      name: name, password: password
    }, "MY_SECRET_TOKEN")
    res.status(201).send({ message: "User Created Successfully", token: token })
  }
  catch (error) {
    res.status(500).json(error)
  }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const bodyData: UserUpdate = req.body;
    const { user_id, address, ...userFields } = bodyData;
    //console.log(bodyData)
    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const updateStatus = await Service.updateUser(bodyData);

    return res.status(200).json({ message:updateStatus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
// export const updateUser = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const bodyData: UserUpdate = req.body;
//     const { user_id, name, phone_no, password, user_profile, address } = bodyData;

//     const user = await UserDetails.findByPk(user_id, {
//       include: [{ model: AddressDetails, as: 'addresses' }],
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update user fields if provided
//     user.name = name ?? user.name;
//     user.phone_no = phone_no ?? user.phone_no;
//     user.password = password ?? user.password;
//     user.user_profile = user_profile ?? user.user_profile;
//     await user.save();

//     return res.status(200).json({ message: 'User updated successfully', user });
//   } catch (error) {
//     console.error('Update Error:', error);
//     return res.status(500).json({ message: 'Internal server error', error });
//   }
// };

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId:any = req.params.id;

    const user:string = await Service.deleteUser(userId);
    return res.status(200).json({ message: 'User and addresses deleted successfully' });
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
