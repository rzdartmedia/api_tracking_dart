const {
  AddAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema
} = require("./schema");
const InvariantError = require("../../exceptions/InvariantError"); // custom message error and code error

const AuthenticationValidator = {
  // function for validate type data which are given
  validateAddAuthenticationPayload: (payload) => {
    // check type data 
    const validationResult = AddAuthenticationPayloadSchema.validate(payload);

    // if validation error throw error
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    // check type data 
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);

    // if validation error throw error
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationValidator;