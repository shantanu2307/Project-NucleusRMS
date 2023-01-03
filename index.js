const express = require("express");
const app = express()
const port = process.env.PORT || 8082;
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
app.use(bodyParser.json())

require('dotenv').config()



const User = require("./Backend/models/Users");

const uri = process.env.MONGO_URI
mongoose.connect(uri, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

const routers = require('./adminbro')
app.use('/admin', routers)
const path = require("path")



app.use('/', express.static(path.join(__dirname, 'dist')));
app.post('/signup/setup', async (req, res) => {
  console.log(req.body)
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({
      user
    });
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

const BuffetRouter = require('./Backend/routers/buffet')
const RestaurantRouter = require('./Backend/routers/restaurant')
const TableRouter = require('./Backend/routers/table')
const RoomRouter = require('./Backend/routers/room')
const OrderRouter = require('./Backend/routers/order');
const BillingRouter = require('./Backend/routers/billing');
//const BuffetRouter2 = require('./Backend/routers/buffet2');

// put all routers which need authentication below this
app.use(BuffetRouter)
//app.use(BuffetRouter2);
app.use(RestaurantRouter)
app.use(TableRouter)
app.use(RoomRouter)
app.use(OrderRouter);
app.use(BillingRouter)

app.listen(port, function (err) {
  if (!err) {
    console.log("server is running at ", port)
  }
})