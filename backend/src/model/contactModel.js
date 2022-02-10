const mongoose = require("mongoose");
const validator = require("validator");
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      minlength: [2, "Name should have more than 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter your Phone"],
      minlength: [10, "Phone should be greater than 10 characters"],
    },
    nodeted: {
      type: String,
      required: [true, "Please enter your nodeted"],
      minlength: [10, "nodeted should be greater than 10 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
