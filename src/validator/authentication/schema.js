const Joi = require("joi"); //plugin for validate type data and input from user

// validation type data for login
const AddAuthenticationPayloadSchema = Joi.object({
  email: Joi.string().max(255).required(),
  password: Joi.string().required(),
  fcmToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
  accessToken: Joi.string().required()
})

module.exports = {
  AddAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema
};