const express = require('express');
const router = express.Router();
const ProductCart = require('../models/productCartModel');
const verify = require('../middleware/authCustomer');

router.post('/cart/:id', verify.verifyCustomer, function (req, res) {
  // console.log('hitted'); 

  const customer = req.customer._id;
  const product = req.params.id;
  const qty = req.body.qty;

  // console.log(customer);
  // console.log(product);
  const cart = new ProductCart({
    customer: customer,
    product: product,
    qty: qty,
  });

  cart
    .save()
    .then(function (result) {
      // success
      // console.log(result);
      res.status(200).json({
        success: true,
        message: 'Product added successfully',
        data: cart,
        count: cart.length,
      });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

router.get('/cart', async (req, res) => {
  const cart = await ProductCart.find({ buyer: req.Customer._id }).populate(
    'product'
  );
  if (!cart) {
    return res.status(400).json({ success: false, message: 'error' });
  }
  res.status(200).json({
    success: true,
    message: 'success',
    data: cart,
    count: cart.length,
  });
});

//For Android

router.get('/acart', verify.verifyCustomer, async (req, res) => {
  const cart = await ProductCart.find({ customer: req.customer._id });
  console.log(cart)
  if (!cart) {
    return res.status(400).json({ success: false, message: 'error' });
  }
  res.status(200).json({
    success: true,
    message: 'success',
    data: cart,
    count: cart.length,
  });
});

router.put('/cart/update', function (req, res) {
  const id = req.body.id;
  const qty = req.body.qty;

  Product.updateOne({ _id: id }, { qty: qty })
    .then(function (result) {
      res.status(200).json({ message: 'Cart Updated!' });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

router.delete('/cart/delete/:id', function (req, res) {
  const id = req.params.id;
  ProductCart.deleteOne({ _id: id })
    .then(function (result) {
      res.status(200).json({ message: 'Cart Deleted!', success: true });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
