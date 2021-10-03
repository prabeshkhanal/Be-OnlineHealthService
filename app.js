const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const db = require('./database/db');
const customerRoute = require('./routes/customerRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');
const CustomerCmtRoute = require('./routes/customerCmtRoute');
const ProductCartRoute = require('./routes/productCartRoute');
const OrderRoute = require('./routes/OrderRoute');

const cors = require('cors');
const path = require('path');



const app = express();
// app.use(express.static(publicDir))

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'image')));
app.use(cors());

//for routes only
app.use(customerRoute);
app.use(productRoute);
app.use(contactRoute);
app.use(CustomerCmtRoute);
app.use(ProductCartRoute);
app.use(OrderRoute);

app.listen(90);