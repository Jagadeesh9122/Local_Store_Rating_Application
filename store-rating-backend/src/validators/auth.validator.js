const { body } = require('express-validator');

const nameRules = { min: 20, max: 60 };
const passwordRegex = /^(?=.{8,16}$)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;

const signupValidator = [
  body('name').isLength({ min: nameRules.min, max: nameRules.max }).withMessage(`Name must be ${nameRules.min}-${nameRules.max} chars`),
  body('email').isEmail(),
  body('address').optional().isLength({ max: 400 }),
  body('password').matches(passwordRegex).withMessage('Password must be 8-16 chars with at least 1 uppercase and 1 special char'),
];

const loginValidator = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

module.exports = { signupValidator, loginValidator };
