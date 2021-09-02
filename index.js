const express = require("express");
const path = require("path"); //variable we use to tell the deployment were going to use where we are at

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "dd7f418cfe194e95b84541d79bce2111",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const fName = [];
const app = express();
app.use(express.json());
app.use("/style", express.static("./public/styles.css"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

app.post("/api/waitlist", (req, res) => {
  let { name, numOfPpl } = req.body;
  name = name.trim();

  const index = fName.findIndex((fullName) => fullName === name);

  if (index === -1 && name !== "") {
    fName.push(name, numOfPpl);
    rollbar.log("check in added successfully", {
      author: "Sherena",
      type: "manual entry",
    });
    res.status(200).send(fName);
  } else if (name === "") {
    rollbar.error("customer already checked in");
    res.status(400).send("customer already checked in");
  } else {
    rollbar.error("customer already checked in");
    res.status(400).send("customer already checked in");
  }
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());
app.listen(port, () => console.log("take us to warp ${port}!"));
