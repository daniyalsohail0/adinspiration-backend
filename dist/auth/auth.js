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
exports.deleteUser = exports.getAllUsers = exports.getUser = exports.updateUser = exports.changePassword = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const hashedContent_1 = require("../utils/hashedContent");
const jwtHelper_1 = require("../utils/jwtHelper");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, companyType, userMessage, hireUGC, subscription, } = req.body;
    const hashedPassword = yield (0, hashedContent_1.hashedText)(password, 10);
    try {
        // Check if the email already exists in the database
        let existingUser = yield userModel_1.default.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, error: "Email already exists" });
        }
        const user = new userModel_1.default({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            companyType,
            userMessage,
            hireUGC,
            subscription,
        });
        yield user.save();
        const token = (0, jwtHelper_1.generateToken)({ userId: user._id, email: user.email });
        res.status(201).json({
            success: true,
            data: {
                token: token,
                user,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error.",
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid email",
            });
        }
        const passwordCheck = (0, hashedContent_1.compareHashedText)(password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({
                success: false,
                error: "Invalid password",
            });
        }
        const token = (0, jwtHelper_1.generateToken)({ _id: user._id });
        res.status(200).json({
            success: true,
            data: {
                token: token,
                id: user._id,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.loginUser = loginUser;
const changePassword = (req, res) => {
    res.send("password changed");
};
exports.changePassword = changePassword;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            console.log("Unauthorized: Token inaccessible");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token inaccessible",
            });
        }
        const decodedToken = yield (0, jwtHelper_1.verifyToken)(token);
        if (!decodedToken) {
            console.log("Unauthorized: Token invalid");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token invalid.",
            });
        }
        if (decodedToken._id !== userId) {
            console.log("Unauthorized: Token UserID invalid");
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token UserID invalid",
            });
        }
        // Check if email or password fields are present in the updatedData
        if (updatedData.email || updatedData.password) {
            return res.status(400).json({
                success: false,
                message: "Cannot update email or password using this function",
            });
        }
        const user = yield userModel_1.default.findByIdAndUpdate(userId, updatedData, {
            new: true,
            runValidators: true,
        });
        res.status(201).json({
            success: true,
            data: {
                user,
            },
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateUser = updateUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = req.params.id;
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token inaccessible.",
            });
        }
        const decodedToken = yield (0, jwtHelper_1.verifyToken)(token);
        if (!decodedToken) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Token invalid.",
            });
        }
        if (decodedToken._id !== userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token UserID invalid.",
            });
        }
        const user = yield userModel_1.default.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or does not exist.",
            });
        }
        res.status(200).json({
            success: true,
            data: { user },
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
exports.getUser = getUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find().select([
            "-password",
            "-companyType",
            "-userMessage",
            "-hireUGC",
        ]);
        res.status(200).json({
            success: true,
            data: { users },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = req.params.id;
        const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token inaccessible.",
            });
        }
        const decodedToken = yield (0, jwtHelper_1.verifyToken)(token);
        if (!decodedToken) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Token invalid.",
            });
        }
        if (decodedToken._id !== userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token UserID invalid.",
            });
        }
        const deletedUser = yield userModel_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or does not exist.",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleleted successfully.",
            data: { deletedUser },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        });
    }
});
exports.deleteUser = deleteUser;
