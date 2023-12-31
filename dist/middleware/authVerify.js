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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerify = void 0;
const jwtHelper_1 = require("../utils/jwtHelper");
const authVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const userId = req.params.userId;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. No valid token provided."
            });
        }
        const decodedToken = yield (0, jwtHelper_1.verifyToken)(token);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token invalid"
            });
        }
        if (decodedToken._id !== userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token UserID invalid."
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});
exports.authVerify = authVerify;
