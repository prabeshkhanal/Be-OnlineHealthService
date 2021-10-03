const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs'); //for password encryption
const authCustomer = require('../middleware/authCustomer');
const jwt = require('jsonwebtoken');

router.post(
  '/customer/signup',
  [
    check('email', 'Email is required!').not().isEmpty(),
    // check('username', "Username is required!").not().isEmpty()
  ],
  function (req, res) {
    const errors = validationResult(req);
    // check if the mail address already exists
    if (errors.isEmpty()) {
      const fname = req.body.fname;
      const lname = req.body.lname;
      const email = req.body.email;
      const password = req.body.password;
      const accounttype = req.body.accounttype;
      bcryptjs.hash(password, 10, function (err, hash) {
        // console.log(hash);
        const data = new Customer({
          fname: fname,
          lname: lname,
          email: email,
          password: hash,
          accounttype: accounttype,
        });
        data
          .save()
          .then(function (result) {
            //success or failed
            res
              .status(201)
              .json({
                success: true,
                message: 'Customer successfully registered!',
              });
          })
          .catch(function (e) {
            res.status(500).json({ success: false, messgae: e });
          });
      });
    } else {
      res.status(400).json(errors.array());
    }
    // res.send(errors.array())
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    // const dob = req.body.dob;
    // const phone = req.body.phone;
    // const address = req.body.address;
    // const email = req.body.email;
    // const username = req.body.username;
    // const password = req.body.password;

    // const data = new Customer({firstname: firstname, lastname: lastname, dob: dob, phone: phone, address: address, email: email, username: username, password: password});
    // data.save();
    // res.send("inserted");
  }
);

//end of registration

//login route for user
// router.get('/customer/login',authCustomer, function(req, res){
//     console.log("test")
// })

router.post('/customer/login', function (req, res) {
  Customer.findOne({ email: req.body.email })
    .then(function (customerData) {
      console.log(customerData);
      if (customerData == null) {
        return res
          .status(401)
          .json({ message: 'Please enter a valid username', success: false });
      }
      bcryptjs.compare(
        req.body.password,
        customerData.password,
        function (err, cresult) {
          if (cresult === false) {
            return res
              .status(401)
              .json({ success: false, message: 'Authentication failed' });
          }

          // else{
          //     res.status(202).json({message : "Login Successfull"})
          // }
          // console.log("Hello friend")
          // if(err){
          //     return res.status(401).json({message : "Authentication failed"})
          // }
          const token = jwt.sign({ cuid: customerData._id }, 'secretkey');
          // console.log(token)
          res
            .status(200)
            .json({
              success: true,
              message: 'Auth success',
              token: token,
              accounttype: customerData.accounttype,
            });
        }
      );
    })
    .catch();
});

//end of login route
//steps:
// 1. get username / password from client
// 2. check if username exists
// 3. if exist check password
// 4. we need to generate token
// 5. its a invalid user

// router.get('/profile', function (req, res){

//     Customer.findOne({_id:req.Customer._id})
//     .then(function(data){
//         res.status(200).json(data)
//     })
//     .catch(function(e){
//         res.status(500).json({error:e})
//     })
// })

router.put('/profile', function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const dob = req.body.dob;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = req.body.password;
  const uid = req.body.id;
  Product.updateOne(
    { _id: uid },
    {
      fname: fname,
      lname: lname,
      dob: dob,
      phone: phone,
      address: address,
      password: password,
    }
  )
    .then(function (result) {
      console.log(result);
      res.status(200).json({ message: 'Profile Updated Successfully!!' });
    })
    .catch(function (e) {
      console.log(e);
      res.status(500).json({ message: e });
    });
});

module.exports = router;
