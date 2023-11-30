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

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

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

    const token = generateToken({ userId: user._id, email: user.email });

    res.status(201).json({
      success: true,
      data: {
        token: token,
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email",
      });
    }

    const passwordCheck = compareHashedText(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        error: "Invalid password",
      });
    }

    const token = generateToken({ _id: user._id });

    res.status(200).json({
      success: true,
      data: {
        token: token,
        id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const changePassword = (req: Request, res: Response) => {
  res.send("password changed");
};

export const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token inaccessible.",
      });
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Token invalid.",
      });
    }

    if (decodedToken._id !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token UserID invalid.",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or does not exist.",
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAllUsers = (req: Request, res: Response) => {
  res.send("all users");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("user deleted");
};
