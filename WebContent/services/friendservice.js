/**
 * 
 */
app.factory('FriendService',function($http){
	var friendService={}
	friendService.getAllSuggestedUsers=function(){
		return $http.get("http://localhost:8083/proj2middleware/suggestedusers")
	}
	
	friendService.addFriend=function(toId){
		//toId is an object of type user
		//toId property in Friend entity
		return $http.post("http://localhost:8083/proj2middleware/addFriend",toId)
	}
	
	friendService.getPendingRequests=function(){
		return $http.get("http://localhost:8083/proj2middleware/pendingrequests")
	}
	
	friendService.acceptRequest=function(request){//requests is an object of type Friend
		//id,fromId,toId,status
		//toId is accepting request fromId
		//update friend set status='A' where id=?
		return $http.put("http://localhost:8083/proj2middleware/acceptrequest",request);
	}
	
	friendService.deleteRequest=function(request){//request is an object of type friend
		//id,fromId,toId,status
		//toId is deleting request fromId
		//delete from friend  where id=?
		return $http.put("http://localhost:8083/proj2middleware/deleterequest",request);
		
	}
	
	friendService.getAllFriends=function(){
		return $http.get("http://localhost:8083/proj2middleware/friends")
	}
	
	return friendService;
})