import { Request, Response } from "express";
import User from "../model/userModel";

export const addSavedCollection = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { collectionId } = req.body;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.savedCollections.includes(collectionId)) {
      return res.status(401).json({
        success: false,
        message: "This collection is already saved.",
      });
    }

    if (user.savedCollections.length >= 20 && user.subscription !== "Pro") {
      return res.status(401).json({
        success: false,
        message:
          "Please upgrade to Pro user. You are only allowed 20 saved items.",
      });
    }

    user.savedCollections.push(collectionId);

    await user.save();

    const updatedCollection = await User.findById(userId)
      .select("savedCollections")
      .populate("savedCollections").exec();

    
    if(!updatedCollection) {
      return res.status(401).json({
        success: false,
        message: "Try again."
      })
    }

    res.status(201).json({
      success: true,
      message: updatedCollection.savedCollections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const removeSavedCollection = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { collectionId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedCollections: collectionId } },
      { new: true }
    ).populate("savedCollections");

    if (updatedUser) {
      res.status(200).json({
        success: true,
        data: updatedUser.savedCollections,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found with the specified ID.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getSavedCollections = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId)
      .populate("savedCollections")
      .select("savedCollections");

    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
