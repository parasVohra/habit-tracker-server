const mongoose = require("mongoose");
const yup = require("yup");

const habitTrackSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  isFullyComplete: {
    type: Boolean,
    default: false,
  },
  isPartialComplete: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Number,
    default: 0,
  },
  data: {
    type: String,
    default: null,
  },
});

const HabitTrack = mongoose.model("HabitTrack", habitTrackSchema);

function validateHabitSchema(habit) {
  const schema = yup.object().shape({
    date: yup.string().required(),
    day: yup.string().required(),
    isFullyComplete: yup.boolean(),
    isPartialComplete: yup.boolean(),
    done: yup.number(),
    data: yup.mixed(),
  });

  return schema.validate(habit);
}

exports.validate = validateHabitSchema;
exports.HabitTrack = HabitTrack;
