const pgp = require("pg-promise")();
const { postgreUrl } = require("../config/env.dev");

const db = pgp(postgreUrl);

module.exports = {
  db,
};
