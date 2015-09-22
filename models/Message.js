var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	body: Array,
	isdeleted: Boolean,
	user1: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	user2: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

mongoose.model('Message', MessageSchema);