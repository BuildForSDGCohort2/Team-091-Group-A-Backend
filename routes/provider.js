const express = require("express");
const { Provider, validateTrip } = require("../models/provider");
const { Service } = require("../models/service");
const {
  Recommendation,
  validateRecommendation,
} = require("../models/recommendation");
const _ = require("lodash");
const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find().populate("services").exec();
    res.status(200).json({
      message: "success",
      data: providers,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
});

router.post("/", auth, checkAdmin, async (req, res) => {
  const { serviceProvider, serviceType, services } = req.body;
  try {
    const error = validateTrip(req.body);
    if (error.error) {
      return res.status(400).json({
        message: "error",
        error: error.error.details[0].message,
      });
    }
    const provider = new Provider({ serviceProvider, serviceType });
    await provider.save((err) => {
      if (err) {
        console.log(err)
      }
      services.forEach(
        ({
          destination,
          origin,
          price,
          timeOfDeparture,
          estimateTimeOfArrival,
        }) => {
          const service = new Service({
            destination,
            origin,
            price,
            timeOfDeparture,
            estimateTimeOfArrival,
            provider: provider._id,
          });
          service.save();
        }
      );
    });
    res.status(201).json({
      message: "success",
      data: {
        provider: _.pick(provider, ["_id", "serviceProvider", "serviceType"]),
        services
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error",
      error,
    });
  }
});

router.get("/services", async (req, res) => {
  try {
    const services = await Service.find()
      .populate({
        path: "provider",
        select: "-services",
      })
      .select("-__v");
    return res.status(200).json({
      message: "success",
      data: services,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "error",
      error,
    });
  }
});

router.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const provider = await Service.findById({ _id: id }).populate({
      path: "provider",
      select: "-services",
    });
    if (provider) {
      res.status(200).json({
        message: "success",
        data: provider,
      });
    } else {
      res.status(404).json({
      message: "error",
      error: "Service Not found in the database",
    });
    } 
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
});
router.get("/find", async (req, res) => {
  const { destination, origin } = req.query;
  try {
    const services = await Service.find({
      destination: new RegExp(`^${destination}$`, "i"),
      origin: new RegExp(`^${origin}$`, "i"),
    })
      .populate({
        path: "provider",
        select: "-services -__v",
      })
      .select("-__v");
    if (services) {
      const recommendations = await Recommendation.find({
        location: new RegExp(`^${destination}$`, "i"),
      });
      res.status(200).json({
        message: "success",
        data: {
          services,
          recommendations,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
});

router.post("/recommendation", auth, checkAdmin, async (req, res) => {
  const { name, type, location, address } = req.body;
  try {
    const error = await validateRecommendation(req.body);
    if (error.error) {
      return res.status(400).json({
        message: "error",
        error: error.error.details[0].message,
      });
    }
    const recommendation = new Recommendation({
      name,
      type,
      location,
      address,
    });
    await recommendation.save();
    res.status(201).json({
      message: "success",
      data: recommendation,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
});
module.exports = router;
