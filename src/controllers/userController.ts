import { Request, Response } from "express";
import db from '../models/index'
import { User, CreateUser, UserUpdate, AddressAttributes, UserAttributes } from "../interfaces/userInterfaces";
import { body } from "express-validator";
import fs from "fs";
import path from "path";
const { UserDetails, AddressDetails } = db


export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserDetails.findAll()
    res.send(users)
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export const createNewUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const details: CreateUser = req.body

    const user_profile = req.file ? req.file.filename : "";
    console.log(user_profile)

    const { name, email, address, password, phone_no } = details
    const user = await UserDetails.create({ name, email, password, phone_no,user_profile })
    await AddressDetails.create({ address, user_id: user.id })
    res.status(201).send("User Created Successfully")
  }
  catch (error) {
    res.status(500).json(error)
  }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const bodyData: UserUpdate = req.body;
    const { user_id, address, ...userFields } = bodyData;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const user = await UserDetails.findByPk(user_id, {
      include: [{ model: AddressDetails, as: 'addresses' }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter user fields that are not undefined and exist in the User model
    const validFields = Object.fromEntries(
      Object.entries(userFields).filter(([_, value]) => value !== undefined)
    );

    for (const key in userFields) {
      const typedKey = key as keyof typeof userFields;
      if (userFields[typedKey] !== undefined) {
        validFields[typedKey] = userFields[typedKey]!;
      }
    }
    // Update only provided fields
    await user.update(validFields);


    return res.status(200).json({ message: 'User updated successfully', user });
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
    const userId = req.params.id;

    const user = await UserDetails.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // await AddressDetails.destroy({
    //     where: { user_id: user.id },
    //   });
    await user.destroy(); // Automatically deletes related addresses

    return res.status(200).json({ message: 'User and addresses deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
