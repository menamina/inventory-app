require("dotenv").config();

const express = require("express");
const server = express();
const path = require("node:path");
const port = process.env.PORT || 5555;

const mainRoute = require("./routes/mainRoute");
const categoryRoute = require("../routes/categoryIdRoute");

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", mainRoute);
server.use("/categories", categoryRoute);

server.listen(port, (error) => {
  if (error) {
    console.log(`whomp big ${error}`);
    return;
  }
  console.log("running");
});
