const mongoose = require("mongoose");
const yup = require("yup");
const { Habits } = require("./habits");
const jwt = require("jsonwebtoken");
const config = require("config");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  resetLink: {
    type: String,
    default: "",
    maxlength: 1024,
  },
  habits: [{ type: Object, ref: Habits }],
});

function validateUsersSchema(habit) {
  const schema = yup.object().shape({
    firstName: yup.string().required().min(3).max(25),
    lastName: yup.string().required().min(3).max(25),
    email: yup.string().required().min(5).max(255),
    isVerified: yup.boolean(),
    password: yup.string().min(5).max(1024),
    resetLink: yup.string().max(1024),
  });

  return schema.validate(habit);
}

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Users = mongoose.model("Users", usersSchema);
exports.validate = validateUsersSchema;
exports.Users = Users;
