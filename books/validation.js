const Joi = require('joi');

exports.bookSchema = Joi.object({
  bookTitle: Joi.string()
    .min(5)
    .max(50)
    .required()
    .messages({ 'any.required': 'Title is required' }),
  bookAuthor: Joi.string()
    .min(5)
    .max(50)
    .required()
    .messages({ 'any.required': 'Author is required' }),
});
