const Joi = require("joi"); //plugin for validate type data and input from user

// validation type data for login
const AddValidationLogAction = Joi.object({
    nameAction: Joi.string().max(50).required(),
    action: Joi.string().max(50).required(),
    manyTimes: Joi.number().required(),
    channel: Joi.array().min(1).required(),
});

const PutValidationLogAction = Joi.object({
    idValidation: Joi.string().max(50).required(),
    manyTimes: Joi.number().required(),
    channel: Joi.array().min(1).required(),
});

// validation value channel
const channelValidation = Joi.object({
    channel: Joi.string().max(50).required(),
    title: Joi.string().max(100).required(),
    message: Joi.string().max(255).required()
})

module.exports = {
    AddValidationLogAction,
    PutValidationLogAction,
    channelValidation
}