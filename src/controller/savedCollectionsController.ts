import { Request, Response } from "express";
import User from "../model/userModel";
import { resolveSoa } from "dns";

export const newSavedCollection = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const {collectionId} = req.body;
    
    const user = await User.findById(userId).populate("savedCollections")

    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      })
    }

    if(user.savedCollections.includes(collectionId)) {
      return res.status(401).json({
        success: false,
        message: "This collection is already saved."
      })
    }

    if(user.savedCollections.length >= 20 && user.subscription !== "Pro") {
      return res.status(401).json({
        success: false,
        message: "Please upgrade to Pro user. You are only allowed 20 saved items."
      })
    }

    user.savedCollections.push(collectionId);

    await user.save()

    res.status(201).json({
      success: true,
      message: user.savedCollections,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const removeSavedCollection = async () => {
  console.log("saved item removed");
};

export const getSavedCollections = async () => {
  console.log("all saved collections");
};
