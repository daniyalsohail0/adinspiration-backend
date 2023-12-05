"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedCollections = exports.removeSavedCollection = exports.addSavedCollection = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const addSavedCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { collectionId } = req.body;
        const user = yield userModel_1.default.findById(userId).select("-password");
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
                message: "Please upgrade to Pro user. You are only allowed 20 saved items.",
            });
        }
        user.savedCollections.push(collectionId);
        yield user.save();
        const updatedCollection = yield userModel_1.default.findById(userId)
            .select("savedCollections")
            .populate("savedCollections").exec();
        if (!updatedCollection) {
            return res.status(401).json({
                success: false,
                message: "Try again."
            });
        }
        res.status(201).json({
            success: true,
            message: updatedCollection.savedCollections,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.addSavedCollection = addSavedCollection;
const removeSavedCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { collectionId } = req.body;
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { $pull: { savedCollections: collectionId } }, { new: true }).populate("savedCollections");
        if (updatedUser) {
            res.status(200).json({
                success: true,
                data: updatedUser.savedCollections,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found with the specified ID.",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.removeSavedCollection = removeSavedCollection;
const getSavedCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userModel_1.default.findById(userId)
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getSavedCollections = getSavedCollections;
