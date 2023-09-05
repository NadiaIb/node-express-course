const express = require("express");
const path = require("path");
const { products } = require("./data");
const app = express();

// setup static and middleware, app.use= middleware, static= built in middleware
// app.use(express.static("./public")); // files server doesn't have to change

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="api/products">products</a>');
});

app.all("*", (req, res) => {
  res.status(404).send(`<h1>Resource not found</h1>`);
});

app.listen(3500, () => {
  console.log("server listening on port 5000");
});

//5:35/12
