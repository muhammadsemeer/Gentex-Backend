const express = require("express");

const app = express();
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { errorHandler, handler404 } = require("./middlewares/errorHandlers");
const {
    indexRouter,
    authRouter,
    hospitalRouter,
    prescriptionRouter,
} = require("./router");

// Global Middlewares
app.use(logger("dev"))
    .use(helmet())
    .use(express.json({ limit: "5mb" }))
    .use(express.urlencoded({ limit: "5mb", extended: false }))
    .use(
        cors({
            credentials: true,
            origin: "*",
        })
    );

// Routers
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/hospital", hospitalRouter);
app.use("/prescription", prescriptionRouter);

// ErrorHandlers
app.use(errorHandler).use(handler404);

module.exports = app;
