const express = require("express");

const app = express();
const logger = require("morgan");
const helmet = require("helmet");
const { errorHandler, handler404 } = require("./middlewares/errorHandlers");
const { indexRouter, authRouter, hospitalRouter } = require("./router");

// Global Middlewares
app.use(logger("dev"))
    .use(helmet())
    .use(express.json({ limit: "5mb" }))
    .use(express.urlencoded({ limit: "5mb", extended: false }));

// Routers
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/hospital", hospitalRouter);

// ErrorHandlers
app.use(errorHandler).use(handler404);

module.exports = app;
