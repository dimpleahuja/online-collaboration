/**
 * #/getblog/14
 */
app.controller('BlogDetailsCtrl',function($scope,$location,BlogService,$rootScope,$sce,$routeParams){
	var id=$routeParams.id;
	$scope.rejectionTxt=false;
	$scope.showComments=false;
	BlogService.getBlog(id).then(
			function(response){
				console.log(response.data)
				$scope.blog=response.data
			$scope.content=	$sce.trustAsHtml($scope.blog.blogContent)
			},function(response){
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')
			})
			//select * from blogpostlikes_s180250 where blogpost_id=? and user_email=?;
	BlogService.hasUserLikedBlog(id).then(
			function(response){
				//response.data will be either null or an object of type BlogPostLikes
				if(response.data=='')//blog is not yet liked by the user
				$scope.isLiked=false//this variable 'isLiked' is used to determine the color of glyphicon
				else
					$scope.isLiked=true
				
			},function(response){
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')
			})
	
	$scope.approve=function(blog){
		//blog.approved=0
		BlogService.approve(blog).then(function(response){
			$location.path('/blogsnotapproved')
		},function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	$scope.reject=function(blog){
		//blog.approved=0
		BlogService.reject(blog,$scope.rejectionReason).then(function(response){
			$location.path('/blogsnotapproved')
		},function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	$scope.showRejectionTxt=function(){
		$scope.rejectionTxt=true;
	}
	
	$scope.updateLikes=function(id){
		BlogService.updateLikes(id).then(function(response){
			$scope.blog=response.data//updated blogpost likes
			$scope.isLiked=!$scope.isLiked
		},function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	$scope.addComment=function(blog,commentTxt){
		$scope.blogComment={}
		//blogComment.setBlogPost(blogPost) in middleware
		$scope.blogComment.blogPost=blog;
		//blogComment.setCommentTxt(commentTxt) in middleware
		$scope.blogComment.commentTxt=commentTxt;
		BlogService.addComment($scope.blogComment).then(
				function(response){
					$scope.commentTxt=''
				    getBlogComments(id)
				},function(response){
					$rootScope.error=response.data
					if(response.status==401)
						$location.path('/login')
					else{
						$scope.exceptionMessage=response.data
					}
				})
	}
	
	function getBlogComments(id){
		BlogService.getBlogComments(id).then(function(response){
			$scope.comments=response.data//select * from blogcomment where blogpost_id=761
		},function(response){
			$rootScope.error=response.data
			if(response.status==401)
				$location.path('/login')
		})
	}
	$scope.onShowComments=function(){
		$scope.showComments=!$scope.showComments;
	}
	getBlogComments(id)
})




































































































































/**
 * #/getblog/14
 *//*
app.controller('BlogDetailsCtrl',function($scope,$location,BlogService,$rootScope,$routeParams){
	var id=$routeParams.id;
	
	BlogService.getBlog(id).then(
			function(response){
				$scope.blog=response.data
			},function(response){
				$rootScope.error=response.data
				if(response.status==401)
					$location.path('/login')
			})
	
})*/