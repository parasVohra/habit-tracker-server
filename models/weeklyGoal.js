const mongoose = require("mongoose");
const yup = require("yup");

const weeklyGoalSchema = new mongoose.Schema({
  inputType: {
    type: String,
    default: "daily",
  },
  value: {
    type: Number,
    default: 7,
  },
});

const WeeklyGoal = mongoose.model("WeeklyGoal", weeklyGoalSchema);

function validateHabitSchema(habit) {
  const schema = yup.object().shape({
    inputType: yup.string(),
    value: yup.number().positive().integer().moreThan(0).lessThan(8),
  });

  return schema.validate(habit);
}

exports.validate = validateHabitSchema;
exports.WeeklyGoal = WeeklyGoal;
