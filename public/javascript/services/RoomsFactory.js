(function() {
	'use strict';
	angular.module('app')
	.factory('RoomsFactory', RoomsFactory);

	RoomsFactory.$inject = ['$http', '$q', '$state'];

	function RoomsFactory($http, $q, $state) {
		var o = {};

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}

		o.getRooms = function(){
			var q = $q.defer();

			$http.get('/api/room').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.getSelectedRoom = function(id){
			var q = $q.defer();

			$http.get('/api/room/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.editRoom = function(room){
			var q = $q.defer();
			console.log(room._id);
			$http.put('/api/room/edit/' + room._id, room, getAuth()).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}
		o.postReview = function(review){
			var q = $q.defer();
			$http.post('/api/review/post', review, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.postReview = function(review){
			var q = $q.defer();
			$http.post('/api/review/post', review, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.postReply = function(reply){
			var q = $q.defer();
			$http.post('/api/review/reply', reply, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		return o;
		
	}
})();