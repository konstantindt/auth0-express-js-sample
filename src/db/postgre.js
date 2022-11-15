const pgp = require("pg-promise")();
const { postgreUrl } = require("../config/env.dev");

const db = pgp(postgreUrl);

const closeDb = () => {
  return db.$pool.end();
};

module.exports = {
  db,
  closeDb,
};
