const express = require("express");
const {getQuiniela_cdad, postQuiniela_cdad  } = require("../Controller/controller");

const Router = express.Router();

 Router.route("/api/cdad").get(getQuiniela_cdad).post(postQuiniela_cdad);
// Router.route("/:id").put(updateNews).delete(deleteNews).get(getOneNews);


module.exports = { Router };