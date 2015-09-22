(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	ProfileFactory.$inject = ['$http', '$q', '$state'];

	function ProfileFactory($http, $q, $state) {
		var o = {};

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}
		o.getProfile = function(id) {
			var q = $q.defer();

			$http.get('/api/user/profile/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.createRoom = function(room){
			var q = $q.defer();

			$http.post('/api/room', room, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}
		o.deleteRoom = function(room){
			var q = $q.defer();
			$http.delete('/api/room/delete/' + room._id, getAuth()).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}
		o.getReview = function(id) {
			var q = $q.defer();

			$http.get('/api/review/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		o.deleteReview = function(review){
			var q = $q.defer();
			$http.delete('/api/review/delete/' + review._id, getAuth()).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}
		o.editReview = function(review){
			var q = $q.defer();

			$http.put('/api/review/edit/' + review._id, review, getAuth()).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}
		o.vouch = function(profile){
			var q = $q.defer();
			console.log(profile);
			$http.post('/api/user/vouch/', profile, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}
		o.sendMessage = function(message){
			var q = $q.defer();
			console.log(message);
			$http.post('/api/messages/post', message, getAuth()).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}

		return o;
		
	}
})();