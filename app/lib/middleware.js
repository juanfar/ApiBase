module.exports.useMiddleware = function(app) {
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const security = require("./security.js");
  const securedRoutes = "/api/priv/";

  app.use(cors());
  configureBodyParser();
  app.use((req, res, next) => {
    logEveryRequest(req);
    next();
  });
  security.useSecurity(app, securedRoutes);

  function configureBodyParser() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
  function logEveryRequest(req) {
    const body = JSON.stringify(req.body);
    console.log(`${req.method} : ${req.url} - ${body}`);
  }
};
