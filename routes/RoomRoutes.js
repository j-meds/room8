var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var User = mongoose.model('User');
var jwt = require("express-jwt");

var auth = jwt({
	secret: "secret",
	userProperty: "payload"
})

router.post('/', auth, function(req, res){
	var room = new Room(req.body);
	room.created = new Date();
	room.user = req.payload.id;
	room.save(function(err, result){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not create that room."});
		User.update({_id: room.user}, {$push: { rooms: { _id: result._id}}}, function(err, review) {
		res.send({_id: result.id});
	});
	});
});
router.get('/', function(req, res){
	Room.find({}).select('images title price location')
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not return rooms."});
		res.send(result);
	});
});
router.get('/:id', function(req, res){
	Room.findOne({_id: req.params.id})
	.populate({
		path: 'reviews',
		model: 'Review'
	}).populate({
		path: 'user',
		model: 'User'
	})
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not return the room."});
		result.populate({
			path: 'user',
			model: 'User',
			select: 'username image name'
		})
		result.populate({
			path: 'reviews.user',
			model: 'User',
			select: 'username image name'
		}, function(err, review) {
			if(err) return res.status(500).send({err: "Error inside the server."});
			if(!review) return res.status(400).send({err: "That movie does not exist"});
			res.send(result);
		});
	});
});
router.delete('/delete/:id',auth, function(req, res){

	Room.remove({_id:req.params.id})
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not delete rooms."});
		res.send();
	});
});
router.put('/edit/:id', auth, function(req, res){
	
	Room.update({_id:req.params.id}, req.body)
	.exec(function(err, result){
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Could not edit rooms."});
		res.send();
	});
});


module.exports = router;