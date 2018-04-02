/**
 *UserService - to make server side calls 
 */
app.factory('UserService',function($http){
	var userService={}
	
	userService.registerUser=function(user){//get the user details from controller frontend
		//alert('entering userservice registeration function')
		//format of user -JSON
		console.log('in userservice ')
		console.log(user)
		return $http.post("http://localhost:8083/proj2middleware/registeruser",user)
	}
	
	userService.login=function(user){
		console.log('userservice -> login')
		console.log(user)
		return $http.post("http://localhost:8083/proj2middleware/login",user)
	}
	
	userService.logout=function(){
		return $http.put("http://localhost:8083/proj2middleware/logout")
	}
	
	userService.getUser=function(){
		return $http.get("http://localhost:8083/proj2middleware/getuser")
	}
	userService.updateUser=function(user){
		return $http.put("http://localhost:8083/proj2middleware/updateuser",user)
	}
	
	return userService;
	
	
})