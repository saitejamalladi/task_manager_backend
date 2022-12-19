var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const config = require("./config");
const swaggerDocument = YAML.load("./swagger.yaml");

var swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

var indexRouter = require("./routes");

var app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  next();
});

app.options("*", (req, res) => {
  res.status(200).send("Allow CORS");
});
app.use("/", indexRouter);
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Task Manager Backend service. Go to /docs to get the documentation");
});
app.get("/health", (req, res) => {
  res.status(200).send("Health Check Ok...");
});
app.use(
  "/docs",
  (req, res, next) => {
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
