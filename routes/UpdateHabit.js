const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits, validate } = require("../models/habits");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  let habitData = req.body;
  console.log(habitData);
  let result = await Habits.findOne({
    // find if habit Track has current date
    _id: ObjectId(habitData.id),
    habitTrack: {
      $elemMatch: {
        date: habitData.date,
      },
    },
  });

  if (result === null) {
    // if result is null then push habit Track object to array
    let result = await Habits.updateOne(
      {
        _id: ObjectId(habitData.id),
      },
      {
        $push: {
          habitTrack: {
            date: habitData.date,
            day: habitData.day,
            isComplete: habitData.isComplete,
          },
        },
      }
    );
    res.send(result);
  } else {
    // else update the isComplete status
    let result = await Habits.updateOne(
      {
        _id: ObjectId(habitData.id),
        habitTrack: {
          $elemMatch: {
            date: habitData.date,
          },
        },
      },
      {
        $set: {
          "habitTrack.$.isComplete": habitData.isComplete,
        },
      }
    );
    res.send(result);
  }
});

module.exports = router;
