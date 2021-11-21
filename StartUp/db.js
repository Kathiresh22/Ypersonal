const config = require("../config");
const mongoose = require("mongoose");
const fs = require("fs");
module.exports = function () {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  console.log("******Waiting for Database Connection Request***");
  mongoose.connect(config.DBURL, options, (err) => {
    if (err) {
      console.log(err);
      console.log("Connection to Database Failed");
      process.exit();
    }
    console.log("************   DB connection Succeeds  **************");
  });
};
