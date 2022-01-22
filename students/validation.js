const Joi = require('joi');

exports.studentSchema = Joi.object({
  studentName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({ 'any.required': 'Name is required' }),
});
