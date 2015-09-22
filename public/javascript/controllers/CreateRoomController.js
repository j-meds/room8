(function() {
	'use strict';
	angular.module('app')
	.controller('RoomController', RoomController);

	RoomController.$inject = ['ProfileFactory', '$state', '$rootScope'];

	function RoomController(ProfileFactory, $state, $rootScope, vm) {
		var vm = this;
		vm.title = 'Room Controller controls this!';
		vm.map = { center: { latitude: 37.80450, longitude: -122.27129 }, zoom: 14 };
		vm.marker = { coords: { latitude: 37.80450, longitude: -122.27129 }};
        
        
		vm.room = {};
		vm.room.images = [];
		vm.room.amenities = [];
		vm.browseRooms = [];

		vm.addImage = function(image){
			vm.room.images.push(image);
			vm.image = "";
		};
		vm.addAmenities = function(amenity){
			vm.room.amenities.push(amenity);
			vm.amenity = "";
		};

		vm.createRoom = function(){
			vm.room.coords = vm.marker.coords;
			ProfileFactory.createRoom(vm.room).then(function(){
			$state.go('Profile', {'id': $rootScope._user.id });
			});
		};

	};
})();