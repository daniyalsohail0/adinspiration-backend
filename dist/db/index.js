"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    const DB_URI = process.env.DB_URI || "";
    mongoose_1.default
        .connect(DB_URI)
        .then(() => {
        console.log("Connect to database.");
    })
        .catch((error) => {
        console.error("Error connecting to database:", error);
    });
};
exports.connectToDatabase = connectToDatabase;
