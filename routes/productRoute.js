const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs"); //for password encryption
const authCustomer = require("../middleware/authCustomer");
const upload = require("../middleware/imageUpload");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/authCustomer");

router.post("/product/add", upload.single("pimage"), function (req, res) {
  console.log(req.file);
  if (req.file == undefined) {
    return res.status(500).json({ message: "Invalid file format" });
  }
  const pname = req.body.pname;
  const pprice = req.body.pprice;
  const pdesc = req.body.pdesc;
  const pcompanyname = req.body.pcompanyname;
  const pmadein = req.body.pmadein;

  const data = new Product({
    pname: pname,
    pprice: pprice,
    pdesc: pdesc,
    pcompanyname: pcompanyname,
    pmadein: pmadein,
    pimage: req.file.filename,
  });

  data
    .save()
    .then(function (result) {
      // success
      res.status(200).json({ message: "Product added successfully" });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

//for update

router.put("/product/update", function (req, res) {
  const pname = req.body.pname;
  const pprice = req.body.pprice;
  const pdesc = req.body.pdesc;
  const pmadein = req.body.pmadein;
  const pcompanyname = req.body.pcompanyname;
  const pid = req.body.id;
  Product.updateOne(
    { _id: pid },
    {
      pname: pname,
      pprice: pprice,
      pdesc: pdesc,
      pmadein: pmadein,
      pcompanyname: pcompanyname,
    }
  )
    .then(function (result) {
      console.log(result);
      res.status(200).json({ message: "Product Updated Successfully!!" });
    })
    .catch(function (e) {
      console.log(e);
      res.status(500).json({ message: e });
    });
});

router.get("/product/fetch", function (req, res) {
  Product.find().then(function (productData) {
    res
      .status(200)
      .json({ success: true, count: productData.length, data: productData });
  });
});

//for single page view
// router.get('product/fetch/single/:id', function (req, res) {
//   const id = req.params.id;
//   Product.findOne({ _id: id })
//     .then(function (productData) {
//       console.log(data);
//       res.status(200).json({ success: true, data: productData });
//     })
//     .catch(function (e) {
//       res.status(500).json({ error: e });
//     });
// });

router.get("/product/single/:id", function (req, res) {
  const id = req.params.id;
  Product.findOne({ _id: id })
    .then(function (productData) {
      // console.log(productData);
      res.status(200).json(productData);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

//for android
router.get("/singleProduct/:id", verify.verifyCustomer, async (req, res) => {
  Product.findById(req.params.id)
    .then((response) => {
      res.status(200).json({ success: true, data: response });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

//for delete

router.delete("/product/delete/:id", function (req, res) {
  const pid = req.params.id;
  Product.deleteOne({ _id: pid })
    .then(function (result) {
      res.status(200).json({ success: true, message: "Product deleted!!" });
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err });
    });
});

module.exports = router;
