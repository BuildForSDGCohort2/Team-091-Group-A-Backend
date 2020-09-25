const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = Schema({
  destination: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timeOfDeparture: {
    type: String,
    required: true,
  },
  estimateTimeOfArrival: {
    type: Number,
    required: true,
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = {
  Service
};
