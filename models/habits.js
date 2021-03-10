const mongoose = require("mongoose");
const yup = require("yup");
const { HabitTrack } = require("./habitTrack");

const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: true,
  },
  isTracked: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "black",
  },
  habitTrack: [{ type: Object, ref: HabitTrack }],
});

const Habits = mongoose.model("Habits", habitSchema);

function validateHabitSchema(habit) {
  const schema = yup.object().shape({
    habitName: yup.string().required(),
    category: yup.string().required(),
    inputType: yup.string().required(),
    isTracked: yup.boolean(),
    color: yup.string(),
  });

  return schema.validate(habit);
}

exports.validate = validateHabitSchema;
exports.Habits = Habits;
