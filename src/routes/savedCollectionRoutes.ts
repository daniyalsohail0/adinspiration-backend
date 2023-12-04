import express from "express";
import { authVerify } from "../middleware/authVerify";
import { newSavedCollection } from "../controller/savedCollectionsController";

const router = express.Router();

router.post("/:userId/saved", authVerify, newSavedCollection);

export default router;
