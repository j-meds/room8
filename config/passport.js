var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({username: username})
	.exec(function(err,user){
		if(err) return done({err: "Server has issues."});
		if(!user) return done({err: "User does not exist"});
		if(!user.checkPassword(password)) return done({err: "Invalid username and password combination."});
		return done(null, user);
	});
}));