const express = require("express");
const path = require("path"); //variable we use to tell the deployment were going to use where we are at

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "dd7f418cfe194e95b84541d79bce2111",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const customerName = [];
const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

app.post("/api/waitlist", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = customerName.findIndex((fullName) => fullName === name);

  customerName.push(name);
  rollbar.log("Check in add successfully", {
    author: "Sherena",
    type: "manual entry",
  });
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());
app.listen(port, () => console.log("take us to warp ${port}!"));
