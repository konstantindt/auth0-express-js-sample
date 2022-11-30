/**
 * Service Methods
 */

const { db } = require("../db/postgre");
const { onfido } = require("./onfido.client");

const selectApplicantIdFromOnfidoByUserId = (user) => {
  return db.oneOrNone('SELECT applicant_id FROM "onfido" WHERE user_id = $1', [
    user.sub,
  ]);
};

const insertOnfido = async (user, applicant) => {
  await db.none("INSERT INTO onfido(user_id, applicant_id) VALUES($1, $2)", [
    user.sub,
    applicant.id,
  ]);
};

const getOne = () => {
  return db.one('SELECT * FROM "onfido" LIMIT 1');
};

const ensureApplicantId = async (user) => {
  return selectApplicantIdFromOnfidoByUserId(user).then((row) => {
    return row !== null
      ? row["applicant_id"]
      : onfido.applicant
          .create({
            firstName: user["given_name"],
            lastName: user["family_name"],
          })
          .then((applicant) => {
            insertOnfido(user, applicant);
            return applicant.id;
          });
  });
};

const getDocuments = (applicantId) => {
  return onfido.document.list(applicantId);
};

const generateSdkToken = (applicantId, applicationId) => {
  return onfido.sdkToken.generate({
    applicantId,
    applicationId,
  });
};

const getChecks = (applicantId) => {
  return onfido.check.list(applicantId);
};

const createCheck = (applicantId, reportNames) => {
  return onfido.check.create({
    applicantId,
    reportNames,
  });
};

module.exports = {
  getOne,
  ensureApplicantId,
  getDocuments,
  generateSdkToken,
  getChecks,
  createCheck,
};
