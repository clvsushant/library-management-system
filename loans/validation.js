const Joi = require('joi');

exports.loanSchema = Joi.object({
  bookId: Joi.number()
    .required()
    .messages({ 'any.required': 'bookId is required' }),
  studentId: Joi.number()
    .required()
    .messages({ 'any.required': 'studentId is required' }),
  outDate: Joi.date()
    .required()
    .messages({ 'any.required': 'outDate is required' }),
  returnDate: Joi.date(),
});
