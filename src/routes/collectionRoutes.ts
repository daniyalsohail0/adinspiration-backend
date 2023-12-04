import express from "express";
import {
  createCollection,
  getAllCollections,
  getCollectionByUser,
  getAllCollectionsByUser,
  updateCollection,
  deleteCollection,
} from "../controller/collectionsController";
import { authVerify } from '../middleware/authVerify';

const router = express.Router();

// All collections
router.get("/collections", getAllCollections);

// Detailed collection by collection id
router.get("/collections/:collectionId", getCollectionByUser);

// Create a new collection by a user - Tested and working
router.post("/:userId/collection", authVerify, createCollection);

// All collections by specific user by user id - Tested and working
router.get("/:userId/collection", authVerify, getAllCollectionsByUser);

// Update collection by collection id - Tested and working
router.put("/:userId/collection/:id", authVerify, updateCollection);

// Delete collection by collection id - Tested and working
router.delete("/:userId/collection/:id", authVerify, deleteCollection);

export default router;
