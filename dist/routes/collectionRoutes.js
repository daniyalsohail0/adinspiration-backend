"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collectionsController_1 = require("../controller/collectionsController");
const authVerify_1 = require("../middleware/authVerify");
const router = express_1.default.Router();
// All collections
router.get("/collections", collectionsController_1.getAllCollections);
// Detailed collection by collection id
router.get("/collections/:collectionId", collectionsController_1.getCollectionByUser);
// Create a new collection by a user - Tested and working
router.post("/:userId/collection", authVerify_1.authVerify, collectionsController_1.createCollection);
// All collections by specific user by user id - Tested and working
router.get("/:userId/collection", authVerify_1.authVerify, collectionsController_1.getAllCollectionsByUser);
// Update collection by collection id - Tested and working
router.put("/:userId/collection/:id", authVerify_1.authVerify, collectionsController_1.updateCollection);
// Delete collection by collection id - Tested and working
router.delete("/:userId/collection/:id", authVerify_1.authVerify, collectionsController_1.deleteCollection);
exports.default = router;
