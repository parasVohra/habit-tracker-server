const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits, validate } = require("../models/habits");
const { Users } = require("../models/users");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    // get user from the db
    const userId = req.body.user._id;

    const user = await Users.findOne({ _id: userId });
    console.log(user);
    habit = new Habits(
      _.pick(req.body, [
        "habitName",
        "category",
        "inputType",
        "isTracked",
        "color",
      ])
    );

    user.habits.push(habit);

    const dbResponse = await user.save();

    res.send(dbResponse);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
