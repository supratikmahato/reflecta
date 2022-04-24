const jwt = require("jsonwebtoken");
const { userModel } = require("../models/modelsExport");

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const accessToken = authorization.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          res.status(401).json({
            success: false,
            code: 401,
            error: "Error: Unauthorized",
          });
        } else {
          userModel.findOne({ token: decoded.token }, (error, user) => {
            if (error) {
              console.error(error);
              res.status(500).json({
                success: false,
                error: "Error: Server error",
              });
            } else if (!user) {
              res.status(400).json({
                success: false,
                error: "Error: user not found",
              });
            } else {
              req.user = user;
              next();
            }
          });
        }
      }
    );
  } else {
    res.status(401).json({
      success: false,
      code: 401,
      error: "Error: Unauthorized",
    });
  }
};

module.exports = authenticate;
