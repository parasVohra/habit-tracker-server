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
  isComplete: {
    type: Boolean,
    default: false,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const HabitTrack = mongoose.model("HabitTrack", habitTrackSchema);

function validateHabitSchema(habit) {
  const schema = yup.object().shape({
    date: yup.string().required(),
    day: yup.string().required(),
    isComplete: yup.boolean(),
    data: yup.mixed(),
  });

  return schema.validate(habit);
}

exports.validate = validateHabitSchema;
exports.HabitTrack = HabitTrack;
