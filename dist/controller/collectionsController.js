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
exports.deleteCollection = exports.updateCollection = exports.getCollectionByUser = exports.getAllCollectionsByUser = exports.getAllCollections = exports.createCollection = void 0;
const collectionsModel_1 = require("../model/collectionsModel");
const userModel_1 = __importDefault(require("../model/userModel"));
const createCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { name, description, videoURLs } = req.body;
        // Check if the user exists
        const user = yield userModel_1.default.findById(userId);
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
        const newCollection = new collectionsModel_1.CollectionModel({
            name,
            description,
            videoURLs,
        });
        // Save the collection
        yield newCollection.save();
        // Add the collection to the user's collections
        user.collections.push(newCollection._id);
        yield user.save();
        res.status(201).json({
            success: true,
            data: {
                newCollection,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.createCollection = createCollection;
const getAllCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield collectionsModel_1.CollectionModel.find();
        res.status(201).json({
            success: true,
            data: collections,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});
exports.getAllCollections = getAllCollections;
const getAllCollectionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userModel_1.default.findById(userId).populate("collections");
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getAllCollectionsByUser = getAllCollectionsByUser;
const getCollectionByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collectionId;
        const collection = yield collectionsModel_1.CollectionModel.findById(collectionId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getCollectionByUser = getCollectionByUser;
const updateCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.id;
        const { name, description, videoURLs } = req.body;
        const updatedCollection = yield collectionsModel_1.CollectionModel.findByIdAndUpdate(collectionId, { name, description, videoURLs }, { new: true, runValidators: true });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateCollection = updateCollection;
const deleteCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.id;
        const deletedCollection = yield collectionsModel_1.CollectionModel.findByIdAndDelete(collectionId);
        console.log(deletedCollection);
        if (!deletedCollection) {
            return res.status(404).json({
                success: false,
                message: "Collection does not exist.",
            });
        }
        res.status(201).json({
            success: true,
            message: "Collection deleted successfully.",
            data: deletedCollection,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.deleteCollection = deleteCollection;
