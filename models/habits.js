const mongoose = require("mongoose");
const { boolean } = require("yup");
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
    habitTrack: [
        {
            
        }
    ]
    
});

