 var passport = require('passport');

/**
 * Session
 * returns info on authenticated user
 */
exports.session = function (req, res) {
  res.send({'user':req.user});
};

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
};

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = function (req, res, next) {
 passport.authenticate('local', {failureFlash: true }),
  function(req, res) {
    res.send({'user':req.user});
  }
}