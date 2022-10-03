const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../validation");
const { userModel } = require("../models");
require("dotenv").config();

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  const { error, value } = userRegisterValidation.validate({
    email: email,
    username: username,
    password: password,
  });
  if (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  } else {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          success: false,
        });
      } else {
        const hashedPassword = hash;
        const user = new userModel({
          email: email,
          username: username,
          password: hashedPassword,
        });
        user.save((error, user) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              error: error.message,
            });
          } else {
            res.json({
              success: true,
            });
          }
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { error, value } = userLoginValidation.validate({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  } else {
    userModel.findOne({ email: email }, (error, user) => {
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
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              error: "Error: Server error",
            });
          } else if (!result) {
            res.status(400).json({
              success: false,
              error: "Error: Wrong password",
            });
          } else {
            const accessToken = jwt.sign(
              { token: user.token },
              process.env.ACCESS_TOKEN_SECRET
            );
            res
              .cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 60,
                httpOnly: true,
                sameSite: "strict",
              })
              .json({
                success: true,
              });
          }
        });
      }
    });
  }
});

module.exports = router;
