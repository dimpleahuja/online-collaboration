/**
 * 
 */
app.controller('NotificationCtrl',function($scope,$rootScope,$location,$routeParams,NotificationService){
	var id=$routeParams.id
	//select * from notification where email=? and viewed=0
	function getNotificationsNotViewed(){
		NotificationService.getNotificationsNotViewed().then(
				function(response){
					$rootScope.notifications=response.data
					$rootScope.notificationCount=$rootScope.notifications.length
				},
				function(response){
					$rootScope.error=response.data//ErrorClazz object
					if(response.status==401)
						$location.path('/login')
				})
		
	}
	if(id!=undefined){
		//two statments
		//select * from notification where id=?
		//update notification set viewed=1 where id=?
		
		NotificationService.getNotification(id).then(
				function(response){
					console.log(response.data)
					$scope.notification=response.data//select * from notification where id=?
				},
				function(response){
					$rootScope.error=response.data//ErrorClazz object
					if(response.status==401)
						$location.path('/login')
				})
				
		NotificationService.updateNotification(id).then(function(response){
			getNotificationsNotViewed()
		},function(response){
			$rootScope.error=response.data//ErrorClazz object
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	
	
	getNotificationsNotViewed()
})


