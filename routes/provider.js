const express = require('express');
const { Provider, Service, validateTrip } = require("../models/provider");
const _ = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find().populate("services");
    res.status(200).json({
    message: "success",
    data: providers
  });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error
    })
  }
  
});


router.post("/", async (req, res) =>  {
  const { serviceProvider, serviceType, services } = req.body;
  try {
    // const error = await validateTrip(req.body);
  //   if (error.error) {
  //   return res.status(400).send(error.error.details[0].message);
  // } 
  const provider =  new Provider({serviceProvider, serviceType});
  await provider.save((err) => {
    if(err) {
      res.status(400).json({
      message: "error",
      error
    })
    }
    services.forEach(({
      destination, origin, price, timeOfDeparture, estimateTimeOfArrival
    }) => {
      const service = new Service({
        destination,
        origin,
        price,
        timeOfDeparture,
        estimateTimeOfArrival,
        provider: provider._id
      })
      service.save((error) => {
        if(error) {
          console.log(error);
          res.status(400).json({
            message: "error",
            error
          })
        }
      });
    });
  });
  res.status(201).json({
      message: "success",
      data: {
        provider
      }
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error",
      error
    })
  }
});


router.get("/services", async (req, res) => {
  try {
    const services = await Service.find().populate({
      path: "provider",
      select: "-services"
    }).select("-__v");
    return res.status(200).json({
    message: "success",
    data: services
  });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "error",
      error
    })
  }
  
});

router.get("/services/:id", async (req, res) => {
  const { id } = req.params
  try {
    const provider = await Service.findById({_id: id}).populate({
      path: "provider",
      select: "-services"
    })
    if(provider) {
      res.status(200).json({
        message: "success",
        data: provider
      })
    } 
  } catch (error) {
    res.status(400).json({
      message: "error",
      error
    })
  }
});
module.exports = router;