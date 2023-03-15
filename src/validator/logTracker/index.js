const {
  AddLogTracker,
} = require("./schema");
const InvariantError = require("../../exceptions/InvariantError"); // custom message error and code error

const LogTrackerValidator = {
  // function for validate type data which are given
  validateAddLogTrackerPayload: (payload) => {
    // check type data 
    const validationResult = AddLogTracker.validate(payload);

    // if validation error throw error
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = LogTrackerValidator;