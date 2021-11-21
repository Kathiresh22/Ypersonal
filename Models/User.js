const mongoose = require("mongoose");
const config = require("../config");
const jwt = require("jsonwebtoken");
/* Users Table/Schema Starts*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "ADMIN",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      role: this.role,
      email: this.email,
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

userSchema.methods.getPublicProfile = function () {
  let profile = {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    active: this.active,
  };
  return profile;
};

//Creating the Schema/Table in Database
const User = mongoose.model("User", userSchema);

exports.User = User;
