const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const userService = require('../db/user.service')

passport.use(
  "jwt",
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      session: false
    },
    async (payload, done) => {
      try {
        const user = await userService.getUserByUsername(payload.username);
        if (user === null) {
          done({
            statusCode: 404,
            message: "User does not exist"
          });
          return;
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

const validateJwtMiddleware = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

module.exports = {
  validateJwtMiddleware,
  middleware: [passport.initialize()]
};