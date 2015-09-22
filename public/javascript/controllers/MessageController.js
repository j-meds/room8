(function() {
	'use strict';
	angular.module('app')
	.controller('MessageController', MessageController);

	MessageController.$inject = ['MessageFactory', '$state', "$stateParams", '$rootScope'];

	function MessageController(MessageFactory, $state, $stateParams, $rootScope) {
		var vm = this;

		vm.messageDisplay = false;
		vm.msg = {};
		
		MessageFactory.getMessages($stateParams.id).then(function(res){
			vm.inbox  = res;
			console.log('messages retrieved');
			console.log(vm.inbox);
		});
		vm.showMessage = function(inbox){
			vm.messageDisplay = true;
			vm.inboxMessage = inbox;
			vm.inboxMessage.body[0].name = 'bubbles';
			vm.msg.body = vm.inboxMessage._id;
			for(var i = 0; i< vm.inboxMessage.body.length; i++)
			if(inbox.user1._id === vm.inboxMessage.body[i].sender ){
				vm.inboxMessage.body[i].name = inbox.user1.name;
		}else vm.inboxMessage.body[i].name = inbox.user2.name;
			
		};
	
		vm.sendMessage = function(){
			MessageFactory.sendMessage(vm.msg).then(function(res){
				vm.inboxMessage.body.push(res);
				vm.msg.message = "";
			});
		}
};
})();