"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionModel = void 0;
const mongoose_1 = require("mongoose");
const collectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoURLs: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
exports.CollectionModel = (0, mongoose_1.model)("Collection", collectionSchema);
