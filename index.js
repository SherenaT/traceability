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

app.post("/api/wishlist", (req, res) => {
  const { name, priority } = req.body;

  let newItem = {
    name,
    priority,
    id: globalId,
  };

  wishlist.push(newItem);

  res.status(200).send(wishlist);
  globalId++;
});
app.delete("/api/wishlist/:id", (req, res) => {
  const { id } = req.params;

  const index = wishlist.findIndex((e) => e.id === +id);

  wishlist.splice(index, 1);

  res.status(200).send(wishlist);
});

const port = process.env.PORT || 4000;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Take us to warp ${port}!`));
