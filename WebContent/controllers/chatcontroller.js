/* 
 * Chat controller
 */
app.controller('ChatCtrl',function($rootScope,$scope,ChatService){
	$scope.stompClient=ChatService.stompClient
	$scope.users=[];//array of users in Chat room
	$scope.chats=[];//array of chat messages
	
	//Event 'sockConnected' -> $rootScope.$broadcast('sockConnected',frame)
	//When you get connected with websocket successfully $scope.$on('sockConnected'....)
	$scope.$on('sockConnected',function(event,frame){
		alert('Successfully connected with WebSocket')
		$scope.userName=$rootScope.loggedInUser.firstname
		alert($scope.userName+ 'joined the chat room')
		//newly joined user name to the middleware
		$scope.stompClient.subscribe("/app/join/"+$scope.userName,function(message){
			console.log(message.body)//List<String> - list of username
			alert(message.body)
			//converting string to JSON
			$scope.users=JSON.parse(message.body)
			$scope.$apply();
		})
		
		$scope.stompClient.subscribe("/topic/join",function(message){
			user=JSON.parse(message.body);//newly joined username , String		 
      if(user != $scope.userName && $.inArray(user, $scope.users) == -1) {
                $scope.addUser(user);
                $scope.latestUser = user;
                $scope.$apply();
                alert($scope.latestUser + 'has joined the chat')
                $('#joinedChat').fadeIn(500).delay(10000).fadeOut(500);
            }
		})	
	})
	
	$scope.addUser=function(user){
		$scope.users.push(user)
		$scope.$apply()
	}
	 
	$scope.sendMessage=function(chat){
		chat.from=$scope.userName
		//JSON.stringify -convert JSON fmt to String
		$scope.stompClient.send("/app/chat",{},JSON.stringify(chat))
		
		$rootScope.$broadcast('sendingChat',chat)
		alert('what do you send'+chat)
		$scope.chat.message=''
	}
	
	$scope.$on('sockConnected',function(event,frame){
		$scope.userName=$rootScope.loggedInUser.firstName;
		
		$scope.stompClient.subscribe("/queue/chats",function(message){
			alert('message' + message.body)
			$scope.processIncomingMessage(message,true)
		});
		
		$scope.stompClient.subscribe("/queue/chats/"+$scope.userName,function(message){
			alert('message is' + message.body)
			$scope.processIncomingMessage(message,false)
		})
		
	})
	
	$scope.processIncomingMessage=function(message,broadcast){
		message=JSON.parse(message.body)//message.body is chat object
		message.direction='incoming'
		if(message.from!=$scope.userName){
			$scope.addChat(message);
			$scope.$apply()
		}
	}
	
	$scope.addChat=function(chat){
		$scope.chats.push(chat)
	}
	
	$scope.$on('sendingChat',function(event,sendChat){
		chat=angular.copy(sendChat)
		chat.from='Me'
		chat.direction='Outgoing'
		$scope.addChat(chat)
		
	})
	
})


