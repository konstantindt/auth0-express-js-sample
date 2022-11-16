const dotenv = require("dotenv");

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
const postgreUrl = process.env.POSTGRE_URL;
const onfidoApiToken = process.env.ONFIDO_API_TOKEN;

if (!audience) {
  throw new Error(
    ".env is missing the definition of an AUTH0_AUDIENCE environmental variable",
  );
}

if (!domain) {
  throw new Error(
    ".env is missing the definition of an AUTH0_DOMAIN environmental variable",
  );
}

if (!serverPort) {
  throw new Error(
    ".env is missing the definition of a API_PORT environmental variable",
  );
}

if (!clientOriginUrl) {
  throw new Error(
    ".env is missing the definition of a APP_ORIGIN environmental variable",
  );
}

if (!postgreUrl) {
  throw new Error(
    ".env is missing the definition of a POSTGRE_URL environmental variable",
  );
}

if (!onfidoApiToken) {
  throw new Error(
    ".env is missing the definition of a ONFIDO_API_TOKEN environmental variable",
  );
}

const clientOrigins = ["http://localhost:4040"];

module.exports = {
  audience,
  domain,
  serverPort,
  clientOriginUrl,
  clientOrigins,
  postgreUrl,
  onfidoApiToken,
};
