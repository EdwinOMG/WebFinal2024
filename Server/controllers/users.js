const express = require("express");
const model = require("../model/users");
const app = express.Router();

app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/:username", (req, res, next) => {
    const username = req.params.username; // Use username instead of id
    model
      .get(username) // Update model method to get by username
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:username", (req, res, next) => {
    const username = req.params.username; // Use username instead of id
    model
      .update(username, req.body) // Update model method to update by username
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:username", (req, res, next) => {
    const username = req.params.username; // Use username instead of id
    model
      .remove(username) // Update model method to remove by username
      .then((x) => res.send(x))
      .catch(next);
  });

module.exports = app;
