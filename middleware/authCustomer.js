// const authCustomer = function(req, res, next){
//     console.log("this is for authentitaion")
//     next();
// }

// module.exports = authCustomer;

// const jwt = require('jsonwebtoken');

// module.exports.verifyuser = function(req, res, next){
//     // console.log("guard")
//     next();
// }

// const authCustomer = function(req, res, next){
//     console.log("this is for authentitaion")
//     next();
// }

const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

//main guard
module.exports.verifyCustomer = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "secretkey");
    await Customer.findOne({ _id: data.cuid })
      .then(function (result) {
        //success
        req.customer = result;
        next();
      })
      .catch(function (ex) {
        //invalid
        res.status(403).json({ errror: ex });
      });
  } catch (error) {
    res.status(403).json({ errror: error });
  }
};

// module.exports.verifyAdmin = function(req,res,next){
//     if(!req.customer){
//         return res,status(401).json({message : "not allowed!! "})
//     }
//     else if(req.customer.accountType!=='Admin'){
//         return res.status(401).json({message : "permission denied!!"})
//     }
//     next();

// }

//second guard
module.exports.verifyAdmin = function (req, res, next) {
  console.log(req.customer);
  if (!req.customer) {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (req.customer.accounttype !== "Admin") {
    return res.status(401).json({ message: "Permission Denied!" });
  }
  next();
};

//third guard
module.exports.verifyUser = function (req, res, next) {
  if (!req.customer) {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (req.customer.accounttype !== "user") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

//fourth guard
// module.exports.verifySeller = function (req, res, next) {
//   if (!req.Customer) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   } else if (req.user.userType !== 'Seller') {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   next();
// };

//fifth guard
module.exports.verifyUserAdmin = function (req, res, next) {
  if (!req.customer) {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (
    req.customer.accounttype !== "user" ||
    req.customer.accounttype !== "Admin"
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
