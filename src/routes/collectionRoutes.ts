import express from "express";
import {
  createNewCollection,
  getAllCollections,
  getCollectionByUser,
  getAllCollectionsByUser,
  updateCollection,
  deleteCollection,
} from "../controller/collectionsController";
import { authVerify } from "../middleware/authVerify";

const router = express.Router();

// create a new collection by a user
router.post("/collection", createNewCollection);

// All collections
router.get("/collections", getAllCollections);

// All collections by specific user by user id
router.get("/collection/:id", authVerify, getCollectionByUser);

// Detailed collection by collection id
router.get("/collections/:id", authVerify, getAllCollectionsByUser);

// Update collection by collection id
router.put("/collection/:id", authVerify, updateCollection);

// Delete collection by collection id
router.delete("/collection/:id", authVerify, deleteCollection);
