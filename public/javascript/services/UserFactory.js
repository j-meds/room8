(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', '$q', '$window', '$rootScope', '$state'];

	function UserFactory($http, $q, $window, $rootScope, $state) {
		var o = {};

		function setToken(token){
			localStorage.setItem('token', token);
		}
		function removeToken() {
			localStorage.removeItem("token");
		}
		function getToken(){
			return localStorage.token;
		}
		function isLoggedIn(){
			var token = getToken();
			if(token){
				var payload = JSON.parse(urlBase64Decoder(token.split('.')[1]));
				if(payload.exp > Date.now() / 1000) {
					return payload;
				}
			}else{
				return false;
			}
		}

		o.register = function(user){
			var q = $q.defer();
			$http.post('/api/user/register', user).success(function(res){
				console.log('user was created');
				q.resolve();
			});
			return q.promise;
		};
		o.login = function(user){
			var q = $q.defer();
			$http.post('/api/user/login', user).success(function(res){
				setToken(res.token);
				$rootScope._user = isLoggedIn();
				console.log(res);
				q.resolve();
			}).error(function(res){
				q.resolve();
			});
			return q.promise;
		};

		o.logout = function() {
			removeToken();
			$rootScope._user = isLoggedIn();
		};

		function urlBase64Decoder(str) {
			var output = str.replace(/-/g, '+').replace(/_/g, '/');
			switch(output.length % 4) {
				case 0:{break; }
				case 2: {output += '=='; break;}
				case 3: {output += '='; break;}
				default:
					throw 'Illegal base64url string'
			}
			return decodeURIComponent(escape($window.atob(output)));
		}

		$rootScope._user = isLoggedIn();

		return o;
	}
})();