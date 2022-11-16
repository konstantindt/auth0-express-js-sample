const { Onfido, Region } = require("@onfido/api");
const { onfidoApiToken } = require("../config/env.dev");

const onfido = new Onfido({
  apiToken: onfidoApiToken,
  region: Region.EU
});

module.exports = {
  onfido,
};
