export const authVerify = (req, res, next) => {
  console.log("middleware for authentication verification");
  next();
};
