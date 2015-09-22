(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['ProfileFactory', '$state', "$stateParams", '$rootScope'];

	function ProfileController(ProfileFactory, $state, $stateParams, $rootScope) {
		var vm = this;
		vm.admin = false;
		vm.liked = false;

		if(!$stateParams.id) $state.go('Home');
		else ProfileFactory.getProfile($stateParams.id).then(function(res) {
			vm.profile = res;
			if($rootScope._user.id === vm.profile._id ){
				vm.admin = true;
			}
			for(var i = 0; i < vm.profile.vouches.length; i++){
				console.log(vm.profile.vouches[i]);
				if(vm.profile.vouches[i].indexOf($rootScope._user.id) != -1){
					console.log('matches');
						vm.liked = true; 
					};
			}

		});
		vm.deleteRoom = function(room){
			ProfileFactory.deleteRoom(room).then(function(){
				$state.go('Home');
			});
		};
		vm.deleteReview = function(review){
			ProfileFactory.deleteReview(review).then(function(){
				$state.go('Home');
			});
		};
		vm.editReview = function(review){
			ProfileFactory.editReview(review).then(function(){
				$state.go('Profile', {'id': $rootScope._user.id });			
			});
		};
		vm.vouch = function(profile){
			var vouchobj = {vouch: profile};
			if(vm.liked === false){
			ProfileFactory.vouch(vouchobj).then(function(res){
				vm.profile.vouches.push(res);
				vm.liked = true;

			});
		};
		};
		vm.sendMessage = function(){
			vm.messages.user2 = vm.profile._id;
			ProfileFactory.sendMessage(vm.messages).then(function(res){
				vm.messageInput = false;
				console.log('message stored succesfully');
			})
			
		}
	}
})();