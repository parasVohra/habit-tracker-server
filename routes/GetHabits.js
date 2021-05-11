const express = require("express");
const router = express.Router();
const { Habits } = require("../models/habits");

router.get("/", async (req, res) => {
  try {
    let habits = await Habits.find({});
    if (!habits) return res.status(400).send("No Habits found");
    res.send(habits);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
