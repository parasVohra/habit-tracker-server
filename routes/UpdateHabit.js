const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Habits } = require("../models/habits");
const { Users } = require("../models/users");
const { HabitTrack } = require("../models/habitTrack");
const auth = require("../middleware/auth");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/", auth, async (req, res) => {
  try {
    // first find the user then

    const userId = req.body.user._id;
    const habitData = req.body;
    console.log(habitData.id);
    const user = await Users.findOne({
      _id: userId,
      habits: {
        $elemMatch: {
          _id: ObjectId(habitData.id),
          habitTrack: {
            $elemMatch: {
              date: habitData.date,
            },
          },
        },
      },
    });

    const habitTrack = new HabitTrack({
      date: habitData.date,
      day: habitData.day,
      isFullyComplete: habitData.isFullyComplete,
      isPartialComplete: habitData.isPartialComplete,
      done: habitData.done,
      data: habitData.inputData,
    });

    if (user === null) {
      // if result is null then push habit Track object to array
      const addNewHabitTrack = await Users.findOne(
        {
          _id: userId,
        },
        {
          habits: {
            $elemMatch: {
              _id: ObjectId(habitData.id),
            },
          },
        }
      );

      console.log("add  ", addNewHabitTrack);

      const up = await Users.updateOne(
        {
          _id: ObjectId(userId),
          habits: {
            $elemMatch: {
              _id: ObjectId(habitData.id),
            },
          },
        },
        {
          $push: {
            "habits.$.habitTrack": habitTrack,
          },
        }
      );

      console.log("up ", up);
      res.status(201).send(addNewHabitTrack);
    } else {
      // else update the isComplete status
      const updateHabitTrack = await Users.updateOne(
        {
          _id: ObjectId(userId),
        },
        {
          $set: {
            "habits.$[h].habitTrack.$[t].isFullyComplete":
              habitData.isFullyComplete,
            "habits.$[h].habitTrack.$[t].isPartialComplete":
              habitData.isPartialComplete,
            "habits.$[h].habitTrack.$[t].done": habitData.done,
            "habits.$[h].habitTrack.$[t].data": habitData.inputData,
          },
        },
        {
          arrayFilters: [
            { "h._id": ObjectId(habitData.id) },
            { "t.date": habitData.date },
          ],
        }
      );
      console.log(updateHabitTrack);
      res.status(201).send(updateHabitTrack);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
