const express = require("express");
const path = require("path");

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "76d46bbbfa774de1ba1f1814e2fe2805",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const wishlist = [];
globalId = 1;

const app = express();
app.use(express.json());
app.use("/style", express.static("/public/styles.css"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = students.findIndex((studentName) => studentName === name); //find index to loop over the name and see if students name already exist

  if (index === -1 && name !== "") {
    //if students name isnt in there are an empty string
    students.push(name);
    rollbar.log("Student add successfully", {
      author: "Sherena",
      type: "manual entry",
    });
    res.status(200).send(students);
  } else if (name === "") {
    rollbar.error("No given name");
    res.status(400).send("must provide a name.");
  } else {
    rollbar.error("student already exists");
    res.status(400).send("that student already exists");
  }
});
const port = process.env.PORT || 4000;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Take us to warp ${port}!`));
