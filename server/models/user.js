const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { randomId } = require("../utils");

const userSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    default: randomId,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  "created-at": {
    type: Date,
    required: true,
    default: Date.now,
  },
  mood: [
    {
      id: {
        type: String,
        required: true,
        default: randomId,
      },
      "coffee-type": {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      "created-at": {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema, "users");
