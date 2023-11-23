const { Schema, model } = require("mongoose");

const { MongooseError } = require("../../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      matches: [
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      ],
    },
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
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter"
    // },
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

