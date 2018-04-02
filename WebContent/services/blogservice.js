/**
 * BlogService
 */
app.factory('BlogService',function($http){
	var blogService={}
	
	blogService.addBlog=function(blog){
		return $http.post("http://localhost:8083/proj2middleware/addblogpost",blog)
	}
	
	blogService.getBlogsWaitingForApproval=function(){
		return $http.get("http://localhost:8083/proj2middleware/getblogs/"+0)
	}
	
	blogService.getBlogsApproved=function(){
		return $http.get("http://localhost:8083/proj2middleware/getblogs/"+1)
	}
	
	blogService.getBlog=function(id){
		return $http.get("http://localhost:8083/proj2middleware/getblog/"+id)
	}
	
	blogService.hasUserLikedBlog=function(id){
		return $http.get("http://localhost:8083/proj2middleware/hasuserlikedblog/"+id)
	}
	
	blogService.approve=function(blog){
		//blog.approved=0
		return $http.put("http://localhost:8083/proj2middleware/approve",blog)
		//blog.approved=1
	}
	blogService.reject=function(blog,rejectionReason){
		//blog.approved=0
		return $http.put("http://localhost:8083/proj2middleware/reject/"+rejectionReason,blog)
		//blog record will get deleted
	}
	blogService.updateLikes=function(id){
		return $http.put("http://localhost:8083/proj2middleware/updatelikes/"+id);
	}
	
	blogService.addComment=function(blogComment){
		return $http.post("http://localhost:8083/proj2middleware/addcomment",blogComment)
	}
	blogService.getBlogComments=function(id){
		return $http.get("http://localhost:8083/proj2middleware/blogcomments/"+id)
	}
	return blogService;
	
})




























































/**
 * BlogService
 *//*
app.factory('BlogService',function($http){
	var blogService={}
	
	blogService.addBlog=function(blog){
		return $http.post("http://localhost:8083/proj2middleware/addblogpost",blog)
	}
	
	blogService.getBlogsWaitingForApproval=function(){
		return $http.get("http://localhost:8083/proj2middleware/getblogs/"+0)
	}
	blogService.getBlogsApproved=function(){
		return $http.get("http://localhost:8083/proj2middleware/getblogs/"+1)
	}
	
	blogService.getBlog=function(id){
		return $http.get("http://localhost:8083/proj2middleware/getblog/"+id)
	}
	
	return blogService;
	
})
*/