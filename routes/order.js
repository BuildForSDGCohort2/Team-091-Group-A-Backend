const express = require("express");
const _ = require("lodash");
const Order = require("../models/order");
const auth = require("../middleware/auth");
const { Service } = require("../models/service");

const router = express.Router();

const getTotalAmount = (arr) => {
  return arr.reduce((acc, next) => acc + next.price, 0)
}

router.post("/", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { services, dateOfOrder  } = req.body;
    const servicesArray = await Promise.all(services.map(({id}) => Service.findById({_id: id}).populate("provider")))
    const amount = await getTotalAmount(servicesArray);
    const order = new Order({
      customerId: _id,
      amount,
      dateOfOrder,
      services: services.map(({id}) => id)
    });
    await order.save()
    res.status(201).json({
      message: "success",
      data: {
        order: _.pick(
          order, 
          ["_id", "customerId", "amount", "orderStatus", "hasPaid", "createDate", "dateOfOrder"]),
        services: servicesArray
      }
    })
} catch (error) {
  res.status(400).json({
      message: "error",
      error
    });
}
});

router.get("/order/:id", auth, async(req, res) => {
  const {id} = req.params;
  try {
    const order = await Order.findById({_id: id}).populate("services");
    if(order){
      res.status(200).json({
        message: "success",
        data: order
      })
    } else {
       res.status(404).json({
      message: "error",
      error: "Not found in the database",
    });
    }
  } catch (error) {
    res.status(400).json({
      message: "error",
      error
    });
  }
  
})

router.patch("/order/:id", auth, async(req, res) => {
   const {id} = req.params;
   try {
     const order = await Order.findById({_id: id}).populate("services");
     if(order) {
      if(order.hasPaid) {
        res.status(403).json({
          message: "error",
          error: "Payment has already been made for this order"
        })
      } else {
        res.status(200).json({
          message: "success",
          data: order
        })
      } 
     } else {
      res.status(404).json({
      message: "error",
      error: "Order Not Found"
    });
     } 
   } catch(error) {
     res.status(400).json({
      message: "error",
      error
    });
   }

})

router.get("/user", auth, async(req, res) => {
   const { _id: userId } = req.user;
  try {
    const orders = await Order.find({customerId: userId, hasPaid: true}).populate("services");
    if(orders){
      res.status(200).json({
        message: "success",
        data: orders
      })
    } else {
      res.status(404).json({
      message: "error",
      error: "Not found in the database"
    });
    }
  } catch (error) {
    res.status(400).json({
      message: "error",
      error
    });
  }
})


module.exports = router;
