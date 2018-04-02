/**
 * 
 */
app.factory('NotificationService',function($http){
var notificationService={}
notificationService.getNotificationsNotViewed=function(){
return	$http.get("http://localhost:8083/proj2middleware/getnotifications")
}	

notificationService.getNotification=function(id){
	return $http.get("http://localhost:8083/proj2middleware/getnotification/"+id)
}

notificationService.updateNotification=function(id){
	return $http.put("http://localhost:8083/proj2middleware/updatenotification/"+id)
}
	return notificationService;
})
