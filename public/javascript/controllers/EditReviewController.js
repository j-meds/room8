(function() {
	'use strict';
	angular.module('app')
	.controller('EditReviewController', EditReviewController);

	EditReviewController.$inject = ['ProfileFactory', '$state', "$stateParams", '$rootScope'];

	function EditReviewController(ProfileFactory, $state, $stateParams, $rootScope) {
		var vm = this;

		if(!$stateParams.id) $state.go('Home');
		else ProfileFactory.getReview($stateParams.id).then(function(res) {
			vm.review = res;
		});
		vm.editReview = function(review){
				ProfileFactory.editReview(review).then(function(res){
				$state.go('Profile', {'id': $rootScope._user.id });
			})
		}
	}

})();