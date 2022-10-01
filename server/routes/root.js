const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API!",
    version: "1.0.0",
  });
});

module.exports = router;
