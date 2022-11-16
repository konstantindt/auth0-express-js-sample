/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { getOne, ensureApplicantId, generateSdkToken } = require("./onfido.service");
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

// POST onfido/

onfidoRouter.get("/sdk-token", checkJwt, async (req, res) => {
  const applicantId = await ensureApplicantId();
  const token = await generateSdkToken(applicantId, req.body["application_id"]);
  res.status(200).send(token);
});

module.exports = {
  onfidoRouter,
};
