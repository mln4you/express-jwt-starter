const express = require('express');
const router = express.Router();
const User = require('../services/user');
const jwt = require('jsonwebtoken');
const { validate } = require('../services/validation');
const { register, login } = require('../services/validation/user-validations');

router.post('/login', validate(login), async (req, res) => {
  try {
    let user = await User.isAutheticated(req.body);
    if (user) {
      const userData = user.dataValues;
      const accessToken = jwt.sign(userData ,process.env.ACCESS_TOKEN_SECRET);

      res.json({ user: userData, ...{token : accessToken}})
    } else {
      res.status(400).json({
        "errors": [
          {
            "value": "authenticate",
            "msg": "Korisnicko ime ili lozinka se ne podudaraju, pokusajte ponovo",
            "param": "authenticate",
            "location": "body"
          }
        ]
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error
    });
  }
});

router.post('/register', validate(register), async (req, res) => {
  try {
      res.status(201).json(await User.create(req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});

module.exports = router;
