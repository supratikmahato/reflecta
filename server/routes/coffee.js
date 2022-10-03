const router = require("express").Router();
const { coffeePostValidation } = require("../validation");
const { userModel } = require("../models");
const authenticate = require("../middlewares/authenticate");
require("dotenv").config();

router.post("/", authenticate, (req, res) => {
  const { content } = req.body;
  const reqUser = req.user;
  const { error, value } = coffeePostValidation.validate({
    "coffee-type": req.body["coffee-type"],
    content: content,
  });
  if (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  } else {
    userModel.findOneAndUpdate(
      { id: reqUser.id },
      {
        $push: {
          mood: {
            "coffee-type": req.body["coffee-type"],
            content: content,
          },
        },
      },
      { new: true, upsert: true },
      (error, user) => {
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
          res.json({
            success: true,
          });
        }
      }
    );
  }
});

router.get("/", authenticate, (req, res) => {
  const reqUser = req.user;
  userModel.findOne({ id: reqUser.id }, (error, user) => {
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
      res.json({
        success: true,
        mood: user.mood,
      });
    }
  });
});

module.exports = router;
