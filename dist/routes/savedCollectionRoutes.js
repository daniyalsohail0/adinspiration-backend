"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authVerify_1 = require("../middleware/authVerify");
const savedCollectionsController_1 = require("../controller/savedCollectionsController");
const router = express_1.default.Router();
router.post("/:userId/saved", authVerify_1.authVerify, savedCollectionsController_1.addSavedCollection);
router.put("/:userId/saved", authVerify_1.authVerify, savedCollectionsController_1.removeSavedCollection);
router.get("/:userId/saved", authVerify_1.authVerify, savedCollectionsController_1.getSavedCollections);
exports.default = router;
