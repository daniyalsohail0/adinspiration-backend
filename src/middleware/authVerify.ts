import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtHelper"

export const authVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = req.params.userId;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. No valid token provided."
      })
    }

    const decodedToken = await verifyToken(token)

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token invalid"
      })
    }

    if (decodedToken._id !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token UserID invalid."
      })
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    })
  }
};
