import express from "express";
import {
  createCollection,
  getAllCollections,
  getCollectionByUser,
  getAllCollectionsByUser,
  updateCollection,
  deleteCollection,
} from "../controller/collectionsController";
import { authVerify } from "../middleware/authVerify";

const router = express.Router();

// Create a new collection by a user
router.post("/collection/:id", createCollection);

// All collections
router.get("/collections", getAllCollections);

// Detailed collection by collection id
router.get("/collections/:id", getAllCollectionsByUser);

// All collections by specific user by user id
router.get("/collection/:id", getCollectionByUser);

// Update collection by collection id
router.put("/collection/:id", updateCollection);

// // Delete collection by collection id
// router.delete("/collection/:id", authVerify, deleteCollection);

export default router;
