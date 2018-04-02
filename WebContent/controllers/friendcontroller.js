/**
 * 
 */
app.controller('FriendCtrl',function($scope,$location,$rootScope,FriendService){
	function getAllSuggestedUsers() {
		FriendService.getAllSuggestedUsers().then(
				function(response){
					$scope.suggestedUsers=response.data //List<User> -> S in (A minus (B Union C))
				},
				function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
				})
	}
	
	function getPendingRequests(){
		FriendService.getPendingRequests().then(
				function(response){
					$scope.pendingRequests=response.data //List<Friend> - select * from friend_s180250 where status='P' and toId_email="john.smith@xyz.com"
				},
				function(response){
					$rootScope.error = response.data
					if(response.status == 401)
						$location.path('/login')
				})
	}
	
	$scope.addFriend=function(toId){
		//toId is user object
		FriendService.addFriend(toId).then(
			function(response){
				alert('Friend request has been sent successfully..')
				getAllSuggestedUsers() //A minus (B Union C) -> List of suggested users
			},
			function(response){
				$rootScope.error = response.data
				if(response.status == 401)
					$location.path('/login')
			
		})
		
	}
	
	$scope.acceptRequest=function(request){//object of type friend.[id,fromId,toId,status]
		//toId is accepting the request fromId
		//update status from 'P' to 'A'
		//update friend set status='A' where id=?
		FriendService.acceptRequest(request).then(function(response){
			getPendingRequests()
		},
		function(response){
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')
			
		})
	}
	
	$scope.deleteRequest=function(request){//object of type friend [id,fromId,toId,status]
		//delete from friend where id=?
		FriendService.deleteRequest(request).then(function(response){
			getPendingRequests()
		},function(response){
			$rootScope.error = response.data
			if (response.status == 401)
				$location.path('/login')
			
		})
	}
	
	FriendService.getAllFriends().then(function(response){
		$scope.friends=response.data
	},function(response){
		$rootScope.error = response.data
		if (response.status == 401)
			$location.path('/login')
		
	})
	
	
	getAllSuggestedUsers()
	getPendingRequests()
})