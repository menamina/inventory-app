require("dotenv").config();

const express = require("express");
const server = express();
const path = require("node:path");
const port = process.env.PORT || 5555;

const mainRoute = require("./routes/mainRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(express.static(path.join(__dirname, "public")));

server.use("/", mainRoute);
server.use("/categories", categoryRoutes);
server.use("/products", productRoutes);

server.listen(port, (error) => {
  if (error) {
    console.log(`whomp big ${error}`);
    return;
  }
  console.log("running");
});
