const express = require('express');
const Room = require('../models/Room');
const User = require('../models/Users');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const router = new express.Router();
const firebase = require('../middlewares/firebase');

router.get('/roomservice', firebase.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      uid: req.query.uid
    });
    const restaurant = await Restaurant.findOne({
      name: req.query.restaurant_name
    });
    const room = await Room.findOne({
      number: req.query.roomnumber
    });
    const orders = await Order.find({
      user_id: user._id,
      restaurant_id: restaurant._id,
      room_no: room._id,
      order_type: 'Room Service'
    });
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

router.get('/selfservice', firebase.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      uid: req.query.uid
    });
    const restaurant = await Restaurant.findOne({
      name: req.query.restaurant_name
    });
    const orders = await Order.find({
      user_id: user._id,
      restaurant_id: restaurant._id,
      order_type: 'Restaurant Table Self Help'
    });
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

router.post('/roomservice', firebase.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      uid: req.body.uid
    });
    const restaurant = await Restaurant.findOne({
      name: req.body.restaurant_name
    });
    var x = new Object({
      user_id: user._id,
      restaurant_id: restaurant._id,
      items: req.body.items,
      order_type: 'Room Service',
      order_detail: {
        is_preorder: req.body.preorder,
        date_time: req.body.date
      },
    });
    var totalbill = 0;
    for (var i = 0; i < x.items.length; i++) {
      var name = x.items[i].name;
      var count = x.items[i].count;
      for (var j = 0; j < restaurant.menu_items.length; j++) {
        if (restaurant.menu_items[j].name == name) {
          totalbill = totalbill + Number((count * restaurant.menu_items[j].price));
        }
      }
    }
    x[total_bill] = totalbill;
    var order = await new Order(x);
    await order.save();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/selfservice', firebase.verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      uid: req.body.uid
    });
    const restaurant = await Restaurant.findOne({
      name: req.body.restaurant_name
    });
    var x = new Object({
      user_id: user._id,
      restaurant_id: restaurant._id,
      items: req.body.items,
      order_type: 'Restaurant Table Self HelpRoom Service',
      order_detail: {
        is_preorder: req.body.preorder,
        date_time: req.body.date
      },
    });
    var totalbill = 0;
    for (var i = 0; i < x.items.length; i++) {
      var name = x.items[i].name;
      var count = x.items[i].count;
      for (var j = 0; j < restaurant.menu_items.length; j++) {
        if (restaurant.menu_items[j].name == name) {
          totalbill = totalbill + Number((count * restaurant.menu_items[j].price));
        }
      }
    }
    x[total_bill] = totalbill;
    var order = await new Order(x);
    await order.save();
  } catch (e) {
    res.status(500).send(e);
  }
});