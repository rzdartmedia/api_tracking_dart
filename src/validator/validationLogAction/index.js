const {
  AddValidationLogAction,
  PutValidationLogAction,
  channelValidation,
} = require("./schema");
const InvariantError = require("../../exceptions/InvariantError"); // custom message error and code error

const ValidationLogActionValidator = {
  // function for validate type data which are given
  validateAddValidationLogActionPayload: (payload) => {
    // check type data 
    const validationResult = AddValidationLogAction.validate(payload);

    // if validation error throw error
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutValidationLogActionPayload: (payload) => {
    // check type data 
    const validationResult = PutValidationLogAction.validate(payload);

    // if validation error throw error
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateChannelPayload: (payload) => {
    // check type data 
    const validationResult = channelValidation.validate(payload);

    // if validation error throw error
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ValidationLogActionValidator;