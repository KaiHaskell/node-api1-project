// implement your API here
const express = require("express");
const Data = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  Data.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Oh no, couldn't make the GET request" });
    });
});
