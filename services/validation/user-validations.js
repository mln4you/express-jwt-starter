const { body } = require('express-validator');
const User = require('../../services/user');

/**
 * Register validation.
 */
const register = [
  body('username').isLength({ min: 6 }).withMessage('Korisnicko ime mora biti bar 6 karaktera')
  .custom(async (value) => {
    let user = null;
    try {
      user = await User.findByUsername(value);
      } catch (error) {
        console.error(error);
        throw new Error('Doslo je do greske u radu servera, pokusajte ponovo');
      }
      if (user) {
        if (value === user.username) {
          throw new Error('Vec postoji to korisnicko ime izaberite drugo');
        }
      }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  body('password').isLength({ min: 6 }).withMessage('Lozinka mora biti bar 6 karaktera'),
  body('passwordAgain').isLength({ min: 6 }).withMessage('Lozinka ponovo mora biti bar 6 karaktera')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Lozinka ponovo se ne slaze sa lozinkom');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  })
];

const login = [
  body('username').isLength({ max: 100 }).withMessage('Korisnicko ime ne moze biti duze od 100 karaktera')
    .isLength({ min: 6 }).withMessage('Korisnicko ime mora biti bar 6 karaktera'),
  body('password').isLength({ max: 100 }).withMessage('Lozinka ne moze biti duza od 100 karaktera')
    .isLength({ min: 6 }).withMessage('Lozinka mora biti bar 6 karaktera'),
];

exports.register = register;
exports.login = login;
