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

    const hasSameHabit = await Users.findOne(
      {
        _id: userId,
      },
      {
        habits: {
          $elemMatch: {
            habitName: req.body.habitName,
          },
        },
      }
    );
    console.log(hasSameHabit);

    if (hasSameHabit) {
      res
        .header("content-type", "application/json")
        .status(400)
        .send({
          error: `Habit named "${req.body.habitName}" is already exits`,
        });
    } else {
      user.habits.push(habit);

      const dbResponse = await user.save();
      res
        .header("content-type", "application/json")
        .status(200)
        .send({ msg: `Habit saved  \uD83D\uDC4D` });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
