var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	title: String,
	location: String,
	coords: Object,
	description: String,
	hometype: String,
	roomtype: String,
	guests: Number,
	beds: Number,
	rooms: Number,
	price: Number,
	amenities: Array,  
	images: Array,
	created: Date,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});


mongoose.model('Room', RoomSchema);