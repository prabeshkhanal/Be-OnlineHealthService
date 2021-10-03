const express = require('express');
const router = express.Router();
const verify = require('../middleware/authCustomer');
const Order = require('../models/OrderModel');

router.post('/order/:id', verify.verifyCustomer, function (req, res) {
  // console.log('hitted');

  const customer = req.customer._id;
    const product = req.params.id;
    //  const qty = req.body.qty;

  // console.log(customer);
  // console.log(product);
  const order = new Order({
    customer: customer,
    product: product,
    // qty: qty,
  });

  order
    .save()
    .then(function (result) {
      // success
      // console.log(result);
      res.status(200).json({
        success: true,
        message: 'Ordered successfully',
        data: order,
        count: order.length,
      });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

router.get('/order', async (req, res) => {
  const order = await Order.find({ customer: req.Customer._id }).populate(
    'product'
  );
  if (!order) {
    return res.status(400).json({ success: false, message: 'error' });
  }
  res.status(200).json({
    success: true,
    message: 'success',
    data: order,
    count: order.length,
  });
});

//For Android

router.get('/aorder', verify.verifyCustomer, async (req, res) => {
  const order = await Order.find({ customer: req.customer._id });
  console.log(order);
  if (!order) {
    return res.status(400).json({ success: false, message: 'error' });
  }
  res.status(200).json({
    success: true,
    message: 'success',
    data: order,
    count: order.length,
  });
});

router.put('/order/update', function (req, res) {
    const id = req.body.id;
    // const qty = req.body.qty;

  Product.updateOne({ _id: id })
    .then(function (result) {
      res.status(200).json({ message: 'Order Updated!' });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

router.delete('/order/delete/:id', function (req, res) {
  const id = req.params.id;
  Order.deleteOne({ _id: id })
    .then(function (result) {
      res.status(200).json({ message: 'Order Deleted!', success: true });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
