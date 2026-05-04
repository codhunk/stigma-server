const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const routes = require("./routes/v1");

const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
