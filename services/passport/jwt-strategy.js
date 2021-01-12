const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../user');

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    try {
      const user = User.findById(jwt_payload.sub);
      if (!user) {
        return done(null,false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
}));
