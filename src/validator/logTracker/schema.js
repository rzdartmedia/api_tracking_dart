const Joi = require("joi"); //plugin for validate type data and input from user

// validation type data for login
const AddLogTracker = Joi.object({
    nameAction: Joi.string().max(50).required(),
    action: Joi.string().max(50).required(),
});

module.exports = {
    AddLogTracker,
}