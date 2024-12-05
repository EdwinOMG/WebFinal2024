const express = require("express");
const model = require("../model/friends");
const app = express.Router();

app.get("/", (req, res, next) => {
  model
    .getAll()
    .then((x) => res.send(x))
    .catch(next);
});

app.get("/:username", (req, res, next) => {
  const username = req.params.username;
  model
    .get(username)
    .then((x) => res.send(x))
    .catch(next);
});

app.post("/", (req, res, next) => {
  const friendEntry = req.body;
  model
    .add(friendEntry)
    .then((x) => res.send(x))
    .catch(next);
});

app.patch("/:user_username/:friend_username", (req, res, next) => {
  const { user_username, friend_username } = req.params;
  const updates = req.body;
  model
    .update(user_username, friend_username, updates)
    .then((x) => res.send(x))
    .catch(next);
});

app.delete("/:user_username/:friend_username", (req, res, next) => {
  const { user_username, friend_username } = req.params;
  model
    .remove(user_username, friend_username)
    .then((x) => res.send(x))
    .catch(next);
});

module.exports = app;
