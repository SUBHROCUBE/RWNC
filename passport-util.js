var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy
dbUtil = require('./db-util');


function hashPassword(password, salt) {
  var key = crypto.pbkdf2Sync(password, salt, 4096, 256);
  return key.toString('hex');
}

/*passport.use(new LocalStrategy(
  function(email, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      Users.findOne({email: email}, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown email ' + email }); }
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
)); */

passport.use(new LocalStrategy(function(email, password, done) {
       dbUtil.validateUser({username:email,userpwd:password}).then(function(user_id) {
        if (user_id == "-1") {
            return done(null, false, { message: 'Unknown email ' + email });
        } else {
            dbUtil.getUsers().then(function(users) {
               done(null, users);
            })
        }
    });
    
}));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/rwnc')
}

exports.ensureAuthenticatedAJAX = function ensureAuthenticatedAJAX(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.status(401).send({"error":"Unauthorised"});
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
   db.get('SELECT * FROM users WHERE id = ?', id, function(err, row) {
    done(err, row);
  });
});

  