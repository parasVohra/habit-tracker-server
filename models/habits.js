const mongoose = require("mongoose");
const yup = require("yup");
const { HabitTrack } = require("./habitTrack");
const { HabitUnit } = require("./habitUnit");
const { WeeklyGoal } = require("./weeklyGoal");

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
  dailyGoal: {
    type: Number,
    default: 1,
  },
  weeklyGoal: {
    type: Object,
    ref: WeeklyGoal,
  },
  habitUnit: {
    type: Object,
    ref: HabitUnit,
  },
  color: {
    type: String,
    default: "black",
  },
  trackType: {
    type: String,
    default: "Checkbox",
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
