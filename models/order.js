const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Processing', "In-Transit", "Cancelled", "Delivered"],
    default: "Processing"
  },
  dateOfOrder: {
    type: Date,
    required: true
  },
  hasPaid: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service"
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;