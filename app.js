const express = require("express");
require("express-async-errors");
const app = express();

require("./StartUp/db")();
require("./StartUp/routes")(app);

app.get("/health", async (req, res) => {
  return res.status(200).send({ result: "Health is good." });
});

//console.log(process.env);

app.use(function (err, req, res, next) {
  console.log(err);
  return res.status(500).send({ result: "Server-Error occurred" });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Runnng on PORT: ${port}`);
});
