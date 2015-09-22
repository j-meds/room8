(function() {
	'use strict';
	angular.module('app')
	.factory('MessageFactory', MessageFactory);

	MessageFactory.$inject = ['$http', '$q', '$state'];

	function MessageFactory($http, $q, $state) {
		var o = {};

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}
		o.getMessages = function(id){
			var q = $q.defer();
			$http.get('/api/messages/'+ id, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.sendMessage = function(message){
			var q = $q.defer();
			$http.post('/api/messages/reply', message, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		

		return o;
		
	}
})();