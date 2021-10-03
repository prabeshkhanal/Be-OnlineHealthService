const express = require('express');
const router = express.Router();
const Comment = require('../models/customerCmtModel');
const customerAuth = require('../middleware/authCustomer');
const { response } = require('express');

//For comment insert

router.post(
  '/customer/cmtinsert',
  function (req, res) {
    const customerid = req.body.customerid;
    const mid = req.body.mid;
    const comment = req.body.comment;

    const data = new Comment({
      customerid: customerid,
      mid: mid,
      comment: comment,
    });

    data
      .save()
      .then(function (result) {
        //success
        res.status(200).json({ message: 'Thank for your comment' });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
  }
);

//For fetching android comment

router.get('/comment/:id', function (req, res) {
  Comment.find({ mid: req.params.id })
    .populate('customerid')
    .populate('mid')
    .exec(function (err, result) {
      res.status(200).json(result);
    });
});

router.get('/androidcmt', function (req, res) {
  Comment.find().then((response) => {
    res.status(200).json({ success: true, data: response });
  });
});

module.exports = router;
