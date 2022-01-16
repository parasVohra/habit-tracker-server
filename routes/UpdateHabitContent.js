const express = require("express");
const router = express.Router();
const { Users } = require("../models/users");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  try {
    const userId = req.body.user._id;

    const {
      habitId,
      habitName,
      category,
      inputType,
      color,
      weeklyGoal,
      habitUnit,
      dailyGoal,
      trackType,
    } = req.body;

    const updateHabitContent = await Users.updateOne(
      {
        _id: ObjectId(userId),
        habits: {
          $elemMatch: {
            _id: ObjectId(habitId),
          },
        },
      },
      {
        $set: {
          "habits.$.habitName": habitName,
          "habits.$.category": category,
          "habits.$.inputType": inputType,
          "habits.$.color": color,
          "habits.$.weeklyGoal": weeklyGoal,
          "habits.$.habitUnit": habitUnit,
          "habits.$.dailyGoal": dailyGoal,
          "habits.$.trackType": trackType,
        },
      }
    );
    res.status(201).send({ msg: `Habit Updated  \uD83D\uDC4D` });
  } catch (error) {
    res.status(400).send({ msg: `Something went wrong 🤷` });
  }
});

module.exports = router;
