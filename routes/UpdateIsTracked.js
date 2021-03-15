const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits, validate } = require("../models/habits");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  console.log(req.body);

  let result = await Habits.updateOne(
    { _id: ObjectId(req.body.id) },
    { $set: { isTracked: req.body.isTracked } }
  );
  res.send(result);
});

module.exports = router;
