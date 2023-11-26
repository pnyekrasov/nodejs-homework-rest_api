const { Schema, model } = require("mongoose");

const { MongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      matches: [
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
      ],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", MongooseError);

module.exports = model("contact", contactSchema);
