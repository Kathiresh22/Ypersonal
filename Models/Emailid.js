const { string } = require("joi");
const mongoose = require("mongoose");

/* Users Table/Schema Starts*/
const emailidSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

//Creating the Schema/Table in Database
const Emailid = mongoose.model("Emailid", emailidSchema);

exports.Emailid = Emailid;
