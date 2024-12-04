const model = require("../model/workouts");
const express = require("express");
const app = express.Router();

app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/:username/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .get(+id, req.params.username)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:username/:id", (req, res, next) => {
    const { username, id } = req.params;
    const workout = req.body;
    model
      .update(+id, username, workout)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:username/:id", (req, res, next) => {
    const { username, id } = req.params;
    model
      .remove(+id, username)
      .then((x) => res.send(x))
      .catch(next);
  });

module.exports = app;
