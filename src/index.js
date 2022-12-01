/**
 * Required External Modules
 */

const express = require("express");
const actuator = require("express-actuator");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");

const { messagesRouter } = require("./messages/messages.router");
const { onfidoRouter } = require("./onfido/onfido.router");
const { closeDb } = require("./db/postgre");
const { UnauthorizedError } = require("express-jwt");
const { OnfidoApiError } = require("@onfido/api");

/**
 * App Variables
 */

const app = express();
const apiRouter = express.Router();

/**
 *  App Configuration
 */

app.use(actuator());
app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use("/messages", messagesRouter);
apiRouter.use("/onfido", onfidoRouter);

app.use((err, req, res, next) => {
  switch (err.constructor) {
    case UnauthorizedError:
      console.log(`ExpressJwtError[${err.code}]`);
      return res.status(err.status).send({
        error: {
          type: err.code,
          message: err.message,
        },
      });
    case OnfidoApiError:
      console.log(`OnfidoApiError[${err.type}] user_id=${req.user.sub}`);
      return res.status(err.statusCode).send(err.responseBody);
    default:
      console.error(err);
      return res.status(500).send(err.message);
  }
});

/**
 * Server Activation
 */

const server = app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);

process.on("SIGTERM", () => {
  server.close(async () => await closeDb());
});
