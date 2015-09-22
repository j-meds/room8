(function() {
	'use strict';
	angular.module('app')
	.controller('RoomsController', RoomsController);

	RoomsController.$inject = ['RoomsFactory'];

	function RoomsController(RoomsFactory) {
			var vm = this;
			vm.title = 'hello matessss';
			
			RoomsFactory.getRooms().then(function(res){
			vm.browseRooms = res;
		});
	}
})();