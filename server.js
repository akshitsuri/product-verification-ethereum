const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

//for security
const mongoSantize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

//colors for console
require("colors");

//load env variables
dotenv.config({ path: "./config/config.env" });

//connect MongoDB
connectDB();

const app = express();

//Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//init middleware-substitute for body-parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//sanitize data
app.use(mongoSantize());

//set security headers
app.use(helmet({ contentSecurityPolicy: false }));

//prevent xss attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//!routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/product", require("./routes/product"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//errorHandler
app.use(require("./middleware/error"));

//Server listening on PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server Started on Port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  //server.close(() => process.exit(1));
});
