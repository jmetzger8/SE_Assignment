import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const newUser: PlatformUser = {
    id: null,
    email,
    password
  };

  // added this
  try{
   const createdUser = await createUser(newUser);
   res.status(201).json({id: createdUser.id});
  }catch(error){
    res.status(400).json({message: 'Could not register user. Email may already be in use.'});
  }

};