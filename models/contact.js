const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleMongooseError } = require('../helpers');
const phoneReg = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailReg,
    },
    phone: {
      type: String,
      match: emailReg,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);



const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailReg).required(),
    phone: Joi.string().pattern(phoneReg).required(),
  favorite:Joi.boolean(),
});

const schemas = {
    addSchema,
}

const Contact = model("contacts", contactSchema);

module.exports = {
    Contact,
    schemas,
};