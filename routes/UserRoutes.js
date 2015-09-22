var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Room = mongoose.model('Room');
var Review = mongoose.model('Review');
var passport = require('passport');
var jwt = require("express-jwt");

var auth = jwt({
	secret: "secret",
	userProperty: "payload"
})

router.param('id', function(req, res, next, id) {
	User.findOne({_id:id})
	.populate({
		path: 'rooms',
		model: 'Room',
		select: 'title images description price'
	})
	.populate({
		path: 'reviews',
		model: 'Review',
		select: 'title body rating room'
	})
	.exec(function(err, user) {
		if(err) return res.status(500).send({err: "Error inside the server."});
		if(!user) return res.status(400).send({err: "That user does not exist"});
		req.user = user;
		next();
	});
});


router.post('/register', function(req,res){
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.created = new Date();
	user.save(function(err, result){
		if(err) console.log(err);
		if(err) return res.status(500).send({err: "Issues with the server"}); //server error
		if(!result) return res.status(400).send({err: "You messed up."}); //error in saving
		res.send();
	});
});


router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){

		if(!user) return res.status(400).send(info);
		res.send({token: user.generateJWT()}); //generating a token when there is a user in the collection.
	})(req, res, next);
});

router.get('/profile/:id', function(req, res) {
	res.send(req.user);
});

router.post('/vouch', auth,  function(req,res){
	userVouch = req.payload.id;
	User.update({_id: req.body.vouch},
	{$push: {vouches: userVouch}} )
	
  .exec(function(err, result){
    if(err) return res.status(500).send({err: "The server is having issues."});
    if(!result) return res.status(400).send({err: "Could not push the reply."});
    res.send(userVouch);
  });
})


module.exports = router;