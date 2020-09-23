const express = require('express');
const { Trip } = require("../models/trip");

const router = express.Router();

router.get("/api/v1/trips", async (req, res) => {
  const trips = await Trip.find();
  res.status(200).json({
    message: "success",
    data: trips
  })
});


module.exports = router;