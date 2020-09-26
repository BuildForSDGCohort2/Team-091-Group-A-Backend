const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const providerSchema = Schema({
  serviceProvider: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ["flight", "bus", "car", "rail", "ship"],
    default: "bus",
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

const Provider = mongoose.model("Provider", providerSchema);

const validateTrip = (trip) => {
  const service = Joi.object().keys({
    destination: Joi.string().required(),
    origin: Joi.string().required(),
    price: Joi.number().required(),
    timeOfDeparture: Joi.string().required(),
    estimateTimeOfArrival: Joi.number().required(),
  });
  const schema = Joi.object({
    serviceProvider: Joi.string().min(3).max(50).required(),
    serviceType: Joi.valid("flight", "bus", "car", "rail", "ship").required(),
    services: Joi.array().items(service),
  });
  return schema.validate(trip);
};

module.exports = {
  Provider,
  validateTrip
};
