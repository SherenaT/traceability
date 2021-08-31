const express = require("express");
const path = require("path");

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "76d46bbbfa774de1ba1f1814e2fe2805",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

app.get("/", (req, res) => {
  res.sendFiles(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

const port = process.env.PORT || 4000;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log("Take us to warp ${port}!"));
