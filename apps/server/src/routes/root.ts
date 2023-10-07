import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    message: "Welcome to the Coffee API!",
  });
});

export default router;
