const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const recommendationSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["tourGuide", "restaurant", "tourism", "hotel"],
    default: "tourism",
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

const validateRecommendation = (recommendation) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    location: Joi.string().required(),
    address: Joi.string().required(),
  });
  return schema.validate(recommendation);
};

module.exports = { Recommendation, validateRecommendation };
