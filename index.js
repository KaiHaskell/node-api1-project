// implement your API here
const express = require("express");
const Data = require("./data/db.js");
const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  Data.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  Data.insert(userInfo)
    .then(user => {
      if (!userInfo.name || !userInfo.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Data.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(req.body);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Data.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;

  Data.update(id, user)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else if (!req.body.name || !req.body.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res.status(200).json(req.body);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be updated" });
    });
});

const port = 5001;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost${port} ***\n`);
});
