import { Request, Response } from "express";
import User, { IUser } from "../model/userModel";
import { hashedText, compareHashedText } from "../utils/hashedContent";
import { generateToken, verifyToken } from "../utils/jwtHelper";

export const registerUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,
    companyType,
    userMessage,
    hireUGC,
    subscription,
  } = req.body;

  const hashedPassword = await hashedText(password, 10);

  try {
    // Check if the email already exists in the database

    let existingUser = await User.findOne({ email });

    console.log(existingUser);

    if (existingUser!) {
      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        companyType,
        userMessage,
        hireUGC,
        subscription,
      });
      await user.save();
    }

    const token = generateToken({ userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const loginUser = (req: Request, res: Response) => {
  res.send("logged in");
};

export const changePassword = (req: Request, res: Response) => {
  res.send("password changed");
};

export const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};

export const getUser = (req: Request, res: Response) => {
  res.send("user");
};

export const getAllUsers = (req: Request, res: Response) => {
  res.send("all users");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("user deleted");
};
