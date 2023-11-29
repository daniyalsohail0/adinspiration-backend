import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY!;

export const generateToken = (
  data: Record<string, any>,
  expiresIn: string = "1h"
): string => {
  return jwt.sign(data, secretKey, { expiresIn });
};

export const verifyToken = (token: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as Record<string, any>);
      }
    });
  });
};
