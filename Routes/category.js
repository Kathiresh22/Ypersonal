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

router.post("/", [adminAuthorizer], async (req, res) => {
  try {
    console.log(req.body);
    let newQuote = new Category(req.body);
    await newQuote.save();
    return res.status(201).send({ result: newQuote });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

router.get("/", [adminAuthorizer], async (req, res) => {
  try {
    let quotes = await Category.find();
    return res.status(200).send({ result: quotes });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

router.get("/:quoteId", [adminAuthorizer], async (req, res) => {
  try {
    let quotes = await Category.findOne({ _id: req.params.quoteId });
    return res.status(200).send({ result: quotes });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

router.put("/", [adminAuthorizer], async (req, res) => {
  try {
    let categoryId = req.body._id;
    if (!categoryId) {
      return res.status(400).send({ errMsg: "Quote Id is required." });
    }
    delete req.body._id;
    console.log(req.body);
    let uC = await Category.updateOne({ _id: categoryId }, { $set: req.body });
    return res.status(200).send({ result: "Quote updated." });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

router.delete("/:categoryId", [adminAuthorizer], async (req, res) => {
  try {
    let categoryId = req.params.categoryId;
    if (!categoryId) {
      return res.status(400).send({ errMsg: "CategoryId is required." });
    }
    let exists = await Category.findOne({ _id: categoryId });
    let uC = await Category.deleteOne({ _id: categoryId });
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
