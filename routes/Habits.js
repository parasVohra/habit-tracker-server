const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits, validate } = require("../models/habits");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  //need to check the what is error type
  if (error) return res.status(400).send(error);

  habit = new Habits(
    _.pick(req.body, [
      "habitName",
      "category",
      "inputType",
      "isTracked",
      "color",
    ])
  );

  let dbResponse = await habit.save();

  res.send(dbResponse);
});

module.exports = router;
