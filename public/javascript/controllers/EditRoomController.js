(function() {
	'use strict';
	angular.module('app')
	.controller('EditRoomController', EditRoomController);

	EditRoomController.$inject = ['RoomsFactory', '$state', "$stateParams", '$rootScope'];

	function EditRoomController(RoomsFactory, $state, $stateParams, $rootScope) {
		var vm = this;

		console.log('edit room');
		if(!$stateParams.id) $state.go('Home');
		else RoomsFactory.getSelectedRoom($stateParams.id).then(function(res) {
			vm.room = res;
			console.log('got the room');
		});

		vm.addImage = function(image){
			vm.room.images.push(image);
			vm.image = "";
		};
		vm.addAmenities = function(amenity){
			vm.room.amenities.push(amenity);
			vm.amenity = "";
		};

		vm.editRoom = function(room){
			RoomsFactory.editRoom(room).then(function(res){
				$state.go('Profile', {'id': $rootScope._user.id });
			})
		}
	}

})();