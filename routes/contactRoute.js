const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const { check, validationResult } = require('express-validator');

router.post('/contactinfo/insert', function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const message = req.body.message;
    const data = new Contact({
      fname: fname,
      lname: lname,
      email: email,
      message: message,
    });
    data
      .save()
      .then(function (result) {
        res.status(201).json({ message: 'Message Sent!' });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
});

module.exports = router;
