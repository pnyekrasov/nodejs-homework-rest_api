const { Schema, model } = require("mongoose");

const { MongooseError } = require("../../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = { User };
