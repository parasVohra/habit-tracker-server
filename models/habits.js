const mongoose = require("mongoose");
const yup = require("yup");

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
  habitTrack: [
    {
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
    },
  ],
});

const Habits = mongoose.model("Habits", habitSchema);

function validateHabitSchema(habit) {
  const schema = yup.object().shape({
    habitName: yup.string().required(),
    category: yup.string().required(),
    inputType: yup.string().required(),
    isTracked: yup.boolean(),
    color: yup.string(),
    habitTrack: yup.array().of(
      yup.object().shape({
        date: yup.string().required(),
        day: yup.string().required(),
        isComplete: yup.boolean(),
        data: yup.mixed(),
      })
    ),
  });

  return schema.validate(habit);
}

exports.validate = validateHabitSchema;
exports.Habits = Habits;
