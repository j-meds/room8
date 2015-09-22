(function() {
	'use strict';
	angular.module('app')
	.controller('NavBarController', NavBarController);

	NavBarController.$inject = ['$state', 'UserFactory', '$rootScope'];

	function NavBarController($state, UserFactory, $rootScope) {
		var vm = this;
		vm.user = {};
		vm.status = $rootScope._user;

		vm.register = function(user){
			UserFactory.register(user).then(function(res){
				vm.user = {};
				vm.status = $rootScope._user;
				$state.go('Profile', {'id': $rootScope._user.id });
			});
		};
		vm.login = function(user){
			UserFactory.login(user).then(function(res){

				if($rootScope._user){
				vm.user = {};
				vm.status = $rootScope._user;
				$state.go('Profile', {'id': $rootScope._user.id });
			}else {vm.loginError = true}

			});
		};
		vm.logout = function(){
			UserFactory.logout();
			vm.status = $rootScope._user;
			$state.go('Home');
		};


	}
})();