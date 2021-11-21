const express = require("express");
const cors = require("cors");
const category = require("../Routes/category");
const user = require("../Routes/user");
const emails = require("../Routes/emails");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/v1/category", category);
  app.use("/api/v1/user", user);
  app.use("/api/v1/emails", emails);
};
