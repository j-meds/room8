var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: {type:String, lowercase:true, unique:true},
	email: {type:String, lowercase:true, unique:true},
	name: String,
	About: String,
	image: String,
	bio: String,
	//untouched on register form
	vouches: Array,
	messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
	rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
	reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
	created: Date,
	passwordHash: String,
	salt: String,
});

//generating jsonwebtoken, for user register & login.
UserSchema.methods.generateJWT = function() {   
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 36500);
	return jwt.sign({
		id : this._id,
		username : this.username,
		exp: exp.getTime() / 1000
	}, "secret");
}
//encrypting the password with a salt.
UserSchema.methods.setPassword = function(password){  
	this.salt = crypto.randomBytes(64).toString('hex');
	this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 4000, 64).toString('hex');
}
//hashes user input password and checks to see if it matches with the passwordHash stored on the server.
UserSchema.methods.checkPassword = function(password){ 
	var hash = crypto.pbkdf2Sync(password, this.salt, 4000, 64).toString('hex');
	return hash === this.passwordHash;
};
mongoose.model('User', UserSchema);