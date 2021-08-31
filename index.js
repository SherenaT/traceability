const express = require("express");
const path = require("path");

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "",
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

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log("Take us to warp ${port}!"));
