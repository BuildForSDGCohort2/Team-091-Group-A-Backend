const express = require("express");
const router = express.Router();

// Consuming a get call

router.get("/", (req, res) => {
  res.send("Welcome Team-091-Group-A......!!!");
});
router.get("/api/v1", (req, res) => {
  res.send("Welcome Team-091-Group-A......!!!");
});
module.exports = router;
