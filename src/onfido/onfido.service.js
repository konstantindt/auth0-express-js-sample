/**
 * Service Methods
 */

const { db } = require("../db/postgre");

const getOne = () => {
  return db.one('SELECT * FROM "onfido" LIMIT 1');
};

module.exports = {
  getOne,
};
