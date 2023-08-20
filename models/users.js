const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const usersSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailReg,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailReg).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailReg).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", usersSchema);
console.log(User);

module.exports = {
  User,
  schemas,
};
