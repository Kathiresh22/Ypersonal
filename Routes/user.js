const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt");
const { User } = require("../Models/User");
const { Category } = require("../Models/Category");
const { Emailid } = require("../Models/Emailid");
const saltRounds = 10;
const adminAuthorizer = require("../Authorizers/adminAuthorizer");
const studentAuthorizer = require("../Authorizers/studentAuthorizer");
const examinerAuthorizer = require("../Authorizers/examinerAuthorizer");

// Creating an Examiner account
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).send({ errMsg: "Email Id is already registered" });
    }
    console.log(req.body);
    req.body.password = await getHash(req.body.password);
    // req.body.passwordDate = Date.now();
    let newUser = new User(req.body);
    await newUser.save();
    newUser.password = null;
    return res.status(201).send({ result: newUser.getPublicProfile() });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error occured." });
  }
});

async function getHash(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ errMsg: "Invalid email/password" });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (isPasswordCorrect) {
      const data = {
        accesstoken: user.generateAuthToken(),
        profile: user.getPublicProfile(),
      };
      return res.status(200).send({ result: data });
    } else {
      return res.status(400).send({ errMsg: "Invalid email/password" });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error." });
  }
});

router.get("/profile", [adminAuthorizer], async (req, res) => {
  try {
    //console.log(req.authUser);
    let userId = req.authUser._id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).send({ errMsg: "Invalid email/password" });
    }

    return res.status(200).send({ result: user.getPublicProfile() });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error." });
  }
});

router.delete("/:userId", [adminAuthorizer], async (req, res) => {
  try {
    let opStatus = await User.deleteOne({ _id: req.params.userId });
    return res.status(200).send({ result: "User deleted" });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error." });
  }
});

router.get("/users", [adminAuthorizer], async (req, res) => {
  try {
    //console.log(req.authUser);
    let userId = req.authUser._id;
    const users = await User.find({ _id: { $ne: req.authUser._id } });
    return res.status(200).send({ result: users });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error." });
  }
});

router.put("/", [adminAuthorizer], async (req, res) => {
  try {
    console.log(req.body);
    let userId = req.body._id;
    let { name, email, password, role } = req.body;
    let updateObj = {
      name: name,
      email: email,
      role: role,
    };
    if (password && password.length > 3) {
      updateObj.password = await getHash(password);
    }
    let uR = await User.updateOne({ _id: userId }, { $set: updateObj });
    return res.status(200).send({ result: "User updated" });
  } catch (ex) {
    console.log(ex);
    return res.status(500).send({ errMsg: "Server error." });
  }
});
module.exports = router;
