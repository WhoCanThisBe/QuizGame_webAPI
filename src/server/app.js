const express = require("express");
const path = require("path");
const match = require("./routes/match-api");
const app = express();


// Serving static content from ./dist/*
app.use(express.static("dist"));

//routes
app.use("/api",match)

app.use((req, res, next) => {
  // We only want to send the index.html file when we receive a GET request to "/" or "/quiz" etc. (everything on
  // the root-path, not our internal API-paths).
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    // Go to the next middleware in the stack
    next();
  }
});

module.exports = app;
