(function() {
	'use strict';
	angular.module('app')
	.controller('SelectedRoomController', SelectedRoomController);

	SelectedRoomController.$inject = ['RoomsFactory', '$state', "$stateParams", '$rootScope'];

	function SelectedRoomController(RoomsFactory, $state, $stateParams, $rootScope) {
		var vm = this;
		vm.showreply = false;
		vm.submitreview = true;

		if(!$stateParams.id) $state.go('Home');
		else RoomsFactory.getSelectedRoom($stateParams.id).then(function(res) {
			vm.room = res;
			
			vm.fixed = JSON.stringify(vm.room.coords);
			vm.fixed2 = JSON.parse(vm.fixed);
			console.log(vm.fixed);

			vm.map = { center: vm.fixed2, zoom: 13 };
			//Hiding review input, for those that have reviewed the room.
			for(var i = 0; i < vm.room.reviews.length; i++){
			if(vm.room.reviews[i].user._id.indexOf($rootScope._user.id) != -1){
						vm.submitreview = false; 
					};
		};
		});
		

		vm.postReview = function(review){
			review.room = vm.room._id;
			console.log(review);
			RoomsFactory.postReview(review).then(function(res){
				console.log('added Review');
				vm.room.reviews.push(res);
			})
		};
		vm.postReply = function(){
			RoomsFactory.postReply(vm.reply).then(function(res){
				console.log(res);
				for(var i = 0; i< vm.room.reviews.length; i++){
					if(vm.room.reviews[i]._id.indexOf(res.review) != -1){
						console.log('matched!')
						vm.room.reviews[i].replies.push(res);
						vm.showreply = false; 
					};
				};
			})
		};
	}
})();