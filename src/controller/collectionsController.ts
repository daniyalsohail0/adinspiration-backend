import { Request, Response } from "express";
import { CollectionModel, Collection } from "../model/collectionsModel";
import User from "../model/userModel";

export const createCollection = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, description, videoURLs } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);

    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.collections.length > 1 && user.subscription !== "Pro") {
      return res.status(400).json({
        success: false,
        message: "Upgrade to Pro user to upload more content.",
      });
    }

    // Create a new collection
    const newCollection: Collection = new CollectionModel({
      name,
      description,
      videoURLs,
    });

    // Save the collection
    await newCollection.save();

    // Add the collection to the user's collections
    user.collections.push(newCollection._id);
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        newCollection,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const collections = await CollectionModel.find();

    res.status(201).json({
      success: true,
      data: collections,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getAllCollectionsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("collections");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const userCollections = user.collections;

    res.status(200).json({
      success: true,
      data: userCollections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getCollectionByUser = async (req: Request, res: Response) => {
  try {
    const collectionId = req.params.id;

    const collection = await CollectionModel.findById(collectionId);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(201).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
    try {
        const collectionId = req.params.id;

        // Destructure the request body to get title, description, and videoURLs
        const { title, description, videoURLs } = req.body;

        // Update the collection using findByIdAndUpdate
        const updatedCollection = await CollectionModel.findByIdAndUpdate(
            collectionId,
            { title, description, videoURLs },
            { new: true, runValidators: true }
        );

        if (!updatedCollection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        res.status(201).json({
            success: true,
            data: updatedCollection,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const deleteCollection = () => {
  console.log("delete a single collection by user");
};
