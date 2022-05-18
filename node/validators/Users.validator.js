const Joi = require('joi')

const { regexes } = require('../constants');

const newUserJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).trim(),
  email: Joi.string().regex(regexes.EMAIL_REGEXP).required().trim().lowercase(),
  age: Joi.number().integer().min(6),
  password: Joi.string().regex(regexes.PASSWORD_REGEXP).required()
});

module.exports = {
  newUserJoiSchema
}
