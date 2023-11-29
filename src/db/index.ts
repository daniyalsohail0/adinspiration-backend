import mongoose from "mongoose";

export const connectToDatabase = () => {
  const DB_URI = process.env.DB_URI || "";

  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Connect to database.");
    })
    .catch((error: any) => {
      console.error("Error connecting to database:", error);
    });
};
