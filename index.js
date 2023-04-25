const express = require("express");
const { connect } = require("./db/config");
const { Router } = require("./Routes/routes");
require("dotenv").config();

const app = express();

connect();

app.use(express.json());

app.use("/", Router);

app.listen(process.env.PORT, () => {
  console.log("listen in :", process.env.PORT);
});

