require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./utils/db");

// Create HTTP server
const server = http.createServer(app);

// Setting PORT
const PORT = process.env.PORT || 5000;
app.set("port", PORT);

server.listen(PORT);
connectDB();

const onListen = () => {
    console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`);
};

const onError = (error) => {
    console.log("Sever Error");
    console.log(error.message);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
};

server.on("listening", onListen);
server.on("error", onError);

// Exception Handler
process
    .on("uncaughtException", (err) => {
        console.error("Uncaught Exception: ", err);
    })
    .on("unhandledRejection", (reason, p) => {
        console.error(
            "Unhandled Rejection at: Promise ",
            p,
            " reason: ",
            reason
        );
    });
