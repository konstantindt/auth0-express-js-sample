/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { getOne } = require("./onfido.service");
const { checkJwt } = require("../authz/check-jwt");

/**
 * Router Definition
 */

const onfidoRouter = express.Router();

/**
 * Controller Definitions
 */

// GET onfido/

onfidoRouter.get("/one", checkJwt, async (req, res) => {
  const one = await getOne();
  res.status(200).send(one);
});

module.exports = {
  onfidoRouter,
};
