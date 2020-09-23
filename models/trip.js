const mongoose = require("mongoose");
const Joi = require("joi");

const tripSchema = new mongoose.Schema({
  serviceProvider: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    enum: ["flight", "bus", "car", "rail", "ship"],
    default: "bus"
  },
  destination: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  timeOfDeparture: {
    type: Date,
    required: true
  },
  estimateTimeOfArrival: {
    type: Number,
    required: true
  }
});


const Trip = mongoose.model("Trip", tripSchema);

const validateTrip = (trip) => {
  const schema = Joi.object({
    serviceProvider: Joi.string().min(3).max(50).required(),
    destination: Joi.string().min(3).max(50).required(),
    origin: Joi.string().min(3).max(50).required(),
    serviceType: Joi.valid("flight", "bus", "car", "rail", "ship").required(),
    price: Joi.number().required(),
    timeOfDeparture: Joi.date().required(),
    estimateTimeOfArrival: Joi.number().required()
  });
  return schema.validate(trip);
}
module.exports = {
  Trip,
  validateTrip
}