(function() {
	'use strict';
	angular.module('app', ['ui.router', 'uiGmapgoogle-maps'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html',
		}).state('Register',{
			url:'/register',
			templateUrl: 'views/register_user.html'
		}).state('Login',{
			url:'/login',
			templateUrl: 'views/login_user.html'
		}).state('BrowseRooms',{
			url: '/browseRooms',
			templateUrl: 'views/browse_rooms.html',
			controller: 'RoomsController',
			controllerAs: 'vm'
		}).state('Room', {
			url: '/room/:id',
			templateUrl: 'views/selected_room.html',
			controller:'SelectedRoomController',
			controllerAs: 'vm'
		}).state('CreateRoom', {
			url: '/createroom',
			templateUrl: 'views/create_room.html',
			controller: 'RoomController',
			controllerAs: 'vm'
		}).state('Profile', {
			url: '/profile/:id',
			templateUrl: 'views/user_profile.html',
			controller: 'ProfileController',
			controllerAs: 'vm'
		}).state('EditRoom', {
			url: '/editroom/:id',
			templateUrl: 'views/edit_room.html',
			controller: 'EditRoomController',
			controllerAs: 'vm' 
		}).state('EditReview', {
			url: '/editreview/:id',
			templateUrl: 'views/edit_review.html',
			controller: 'EditReviewController',
			controllerAs: 'vm'
		}).state('Messages', {
			url: '/messages/user/:id',
			templateUrl: 'views/user_messages.html',
			controller: 'MessageController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
