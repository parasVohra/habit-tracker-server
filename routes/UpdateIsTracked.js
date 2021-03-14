const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits, validate } = require("../models/habits");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  res.send(req.body.data);
});

module.exports = router;
