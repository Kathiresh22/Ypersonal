const express = require("express");

const config = require("../config");
const router = express.Router();
const { User } = require("../Models/User");
const { Category } = require("../Models/Category");
const { Emailid } = require("../Models/Emailid");
const mongoose = require("mongoose");
const adminAuthorizer = require("../Authorizers/adminAuthorizer");
const studentAuthorizer = require("../Authorizers/studentAuthorizer");
const examinerAuthorizer = require("../Authorizers/examinerAuthorizer");

router.get("/", [adminAuthorizer], async (req, res) => {
  try {
    let emails = await Emailid.find();
    return res.status(200).send({ result: emails });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

// router.get("/:emailId", [adminAuthorizer], async (req, res) => {
//   try {
//     let data = await Emailid.findOne({ _id: req.params.emailId });
//     return res.status(200).send({ result: data });
//   } catch (ex) {
//     console.log(ex);
//     return res.status(500).send({ errMsg: "Server error occured." });
//   }
// });
router.get("/:catId", [adminAuthorizer], async (req, res) => {
  try {
    let data = await Emailid.find({ category: req.params.catId.toLowerCase() });
    return res.status(200).send({ result: data });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});
router.post("/", [adminAuthorizer], async (req, res) => {
  try {
    let email = req.body.email.toLowerCase();
    let category = req.body.category.toLowerCase();
    if (!email) {
      return res.status(400).send({ errMsg: "Email is required." });
    }
    let exists = await Emailid.findOne({ email: email });
    let cexists = await Category.findOne({ name: category });
    if (exists) {
      return res.status(400).send({ errMsg: "Email already exixts." });
    }
    if (!cexists) {
      return res.status(400).send({ errMsg: "Category doesn't exist." });
    }
    let nc = new Emailid({ email: email, category: category });
    await nc.save();
    return res.status(200).send({ result: "Email created." });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

router.put("/", [adminAuthorizer], async (req, res) => {
  try {
    let email = req.body.email.toLowerCase();
    let category = req.body.category.toLowerCase();
    let mailId = req.body._id;
    console.log(req.body);
    if (!email) {
      return res.status(400).send({ errMsg: "Email is required." });
    }
    let cexists = await Category.findOne({ name: category });
    if (!cexists) {
      return res.status(400).send({ errMsg: "Category doesn't exist." });
    }
    let nc = await Emailid.updateOne({ _id: mailId }, { $set: { email: email, category: category } });
    return res.status(200).send({ result: "Email updated." });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

router.delete("/:mailId", [adminAuthorizer], async (req, res) => {
  try {
    let mailId = req.params.mailId;
    if (!mailId) {
      return res.status(400).send({ errMsg: "Mailid is required." });
    }
    let uC = await Emailid.deleteOne({ _id: mailId });
    return res.status(200).send({ result: "Category deleted." });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

/*

try {
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ result: "Server error occured." });
  }

  */

module.exports = router;
