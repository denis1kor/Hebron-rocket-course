const joi = require('joi')

const { constants } = require('../constants');

const loginSchema = joi.object({
  email: joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  password: joi.string().regex(constants.PASSWORD_REGEXP).required()
});

module.exports = {
  loginSchema
}
