const mongoose = require("mongoose");
const yup = require("yup");

const habitUnitSchema = new mongoose.Schema({
  inputType: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  value: {
    type: String,
    default: null,
  },
});

const HabitUnit = mongoose.model("HabitUnit", habitUnitSchema);

function validateHabitSchema(habit) {
  const schema = yup.object().shape({
    inputType: yup.mixed(),
    value: yup.string(),
  });

  return schema.validate(habit);
}

exports.validate = validateHabitSchema;
exports.HabitUnit = HabitUnit;
