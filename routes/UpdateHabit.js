const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits, validate } = require("../models/habits");

router.post("/", async (req, res) => {
  //1 find habit with id

  // if found then find the date in habit track array
  // if found date then update the value of isComplete
  // else push update object to habit Tracker

  res.send(req.body);
});

module.exports = router;
