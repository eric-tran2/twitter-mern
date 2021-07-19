const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const User = require('./models/User');
const passport = require('passport');


const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


app.get("/", (req, res) => {
  const user = new User({
    handle: "eric",
    email: "eric@eric.eric",
    password: "ericisgreat123"
  }) 
  user.save()
  res.send("Testing 1 2 1 2 Mic Check")});

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use("/api/users", users);
app.use("/api/tweets", tweets);
