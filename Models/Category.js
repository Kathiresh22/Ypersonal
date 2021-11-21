const mongoose = require("mongoose");

/* Users Table/Schema Starts*/
const categorySchema = new mongoose.Schema(
  {
    agency: {
      type: String,
      required: true,
      lowercase: true,
    },
    producer: {
      type: String,
      required: true,
      lowercase: true,
    },
    effectiveDate: {
      type: Date,
      required: true,
    },
    lineOfBusiness: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    clientName: { type: String, default: null },
    gender: { type: String, default: null },
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    email: { type: String, default: null },
    writingCompany: { type: String, default: null },
    policy: { type: Array, default: [] },
  },
  { timestamps: true }
);

//Creating the Schema/Table in Database
const Category = mongoose.model("Quote", categorySchema);
exports.Category = Category;
