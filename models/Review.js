var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	title: String,
	body: String,
	created: Date,
	rating: Number,
	replies: Array,
	room: {type: mongoose.Schema.Types.ObjectId, ref: "Room"},
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

mongoose.model('Review', ReviewSchema);