import express from "express";
import { authVerify } from "../middleware/authVerify";
import { addSavedCollection, getSavedCollections, removeSavedCollection } from "../controller/savedCollectionsController";

const router = express.Router();

router.post("/:userId/saved", authVerify, addSavedCollection);

router.put("/:userId/saved", authVerify, removeSavedCollection);

router.get("/:userId/saved", authVerify, getSavedCollections);

export default router;
