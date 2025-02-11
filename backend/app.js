const express = require("express");
const rateLimit = require("./node_modules/express-rate-limit/dist/index.d.cts");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");

const listRouter = require("./routes/listRoutes");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");

const app = express();

// RATE LIMITING(requests per set time limit)
const rateLimiter = rateLimit({
  windosMs: 20 * 60 * 1000, // every 20 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests. Please try again later",
});

app.use("/api", rateLimiter);

// BODY PARSER
app.use(express.json({ limit: "10kb" }));

// DATA SANITIZATION
app.use(mongoSanitize());
app.use(xss());

app.use("/api/v1/list", listRouter);
app.use("/api/v1/users", userRouter);
app.use("*", (req, res, next) => {
  return next(
    new AppError(`The requested url ${req.originalUrl} can't be found`)
  );
});

module.exports = app;
