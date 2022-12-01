/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const asyncMiddleware = require("async-middleware");
const {
  getOne,
  ensureApplicantId,
  getDocuments,
  generateSdkToken,
  getChecks,
  createCheck,
} = require("./onfido.service");
const { checkJwt } = require("../authz/check-jwt");

/**
 * Router Definition
 */

const onfidoRouter = express.Router();
const wrap = asyncMiddleware.wrap;

/**
 * Controller Definitions
 */

// GET onfido/

onfidoRouter.get(
  "/one",
  checkJwt,
  wrap(async (req, res) => {
    const one = await getOne();
    res.status(200).send(one);
  })
);

onfidoRouter.get(
  "/documents",
  checkJwt,
  wrap(async (req, res) => {
    const applicantId = await ensureApplicantId(req.user);
    const documents = await getDocuments(applicantId);
    res.status(200).send(documents);
  })
);

onfidoRouter.get(
  "/checks",
  checkJwt,
  wrap(async (req, res) => {
    const applicantId = await ensureApplicantId(req.user);
    const checks = await getChecks(applicantId);
    res.status(200).send(checks);
  })
);

// POST onfido/

onfidoRouter.post(
  "/sdk-token",
  checkJwt,
  wrap(async (req, res) => {
    const applicantId = await ensureApplicantId(req.user);
    const token = await generateSdkToken(
      applicantId,
      req.body["application_id"]
    );
    res.status(200).send({ sdk_token: token });
  })
);

onfidoRouter.post(
  "/checks",
  checkJwt,
  wrap(async (req, res) => {
    const applicantId = await ensureApplicantId(req.user);
    const check = await createCheck(applicantId, req.body["report_names"]);
    res.status(200).send(check);
  })
);

module.exports = {
  onfidoRouter,
};
