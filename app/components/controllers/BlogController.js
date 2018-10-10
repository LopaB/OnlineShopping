angular.module('CollaborationApp').controller('BlogController',function(BlogService, BlogCommentService,RegisterService,$cookies,$rootScope, $route, $routeParams, $location){

  var me = this;
me.user=$rootScope.user;
me.blogId="";
  me.blog = {

        blogId : null,
        blogTitle : ' ',
        blogContent : '',
        blogPosted : '',
        userId : '',
        username : '',
    }
    
	me.blogComment = {

        blogCommentId : null,
        title : '',
        blogComment : ' ',
        commentDate : '',
        userId : '',
        username : '',
    }

   // view single Blog
    me.singleBlog = {};
    
    // post date on blog
    me.blogPosted = {};

    me.bloglist = [];

    //list of user's blogs
    me.myblogs = [];

    //display blog comments
    me.blogCommentList = [];

	//add new blog
	me.addBlog=function(){
	 //Setting the user id and username
	var user=$rootScope.user;
        me.blog.userId = user.userId;
        me.blog.username = user.username;
		//me.blog.blogPosted=new Date().toJSON().slice(0,10);
         //calling the addBlog method in the service
         BlogService.addBlog(me.blog)
            .then (
                function(blog) {
                    //me.blog =  blog;
                    //var bId = me.blog.blogId;
                    $location.path('/blog');
                }, 
				function (errResponse) {
					console.error('Error while Adding the blog');
                }
            );
}

 //view my blogs
    me.viewBlog = function() {
        //Assig blog id to variable blogId
        var user=$rootScope.user;
        var id=user.userId;
		console.log(id);
        BlogService.viewBlog(id)
            .then (
                function(blog) {
                    me.bloglist = blog;
                    for(var [blog] in me.bloglist) {
                        me.bloglist[blog].blogPosted = new Date(me.bloglist[blog].blogPosted[0],me.bloglist[blog].blogPosted[1] - 1,me.bloglist[blog].blogPosted[2]);
                     // blogCommentlist(blog.blogId);  //blog comment list
				}
                    
                },
                function(errResponse) {
                }
            );

    }

    //view my blogs
    me.viewSingleBlog = function() {
        //Assign blog id to variable blogId
        console.log('in single blog page...')
        me.blogId=$routeParams.blogId;
		console.log(me.blogId);
        BlogService.viewSingleBlog(me.blogId)
            .then (
                function(blog) {
                    me.singleBlog = blog;
                    me.singleBlog.blogPosted = new Date(me.singleBlog.blogPosted[0],me.singleBlog.blogPosted[1] - 1,me.singleBlog.blogPosted[2]);
                    me.blogCommentlist(blog.blogId);  //blog comment list                    
                },
                function(errResponse) {
                }
            );

    }

    //add likes to blog
    me.likes = function(id) {      
        BlogService.likes(id)
            .then (
                function(blog) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

    //add a new blog comment
    me.addBlogComment = function () {

        //Setting the user id and username
		var user=$rootScope.user;
        me.blogComment.userId = user.userId;
        me.blogComment.username = user.username;
        me.blogComment.blogId = $routeParams.blogId;
         //calling the addBlog method in the factory
         BlogCommentService.addBlogComment(me.blogComment)
            .then (
                function(blogComment) {
                    me.blogComment =  blogComment;
                    $route.reload();
                   
                }, function (errResponse) {
                    
                }
            );
         
    }

    //Function to view list of all approved blogs
    me.blogList = function() {

        // var status = "APPROVED"
        BlogService.blogList()
            .then (
                function(blogs) {
               
                    me.bloglist = blogs;
                    for(var [blog] in me.bloglist) {
                        me.bloglist[blog].blogPosted = new Date(me.bloglist[blog].blogPosted[0],me.bloglist[blog].blogPosted[1] - 1,me.bloglist[blog].blogPosted[2]);
                    }
                },
                function(errResponse) {
                }
            );
    }

    
    

    //Function to view list of all blog comments
    me.blogCommentlist=function(blogId) {

        //var blogId = $routeParams.id;
        BlogService.blogCommentlist(blogId)
            .then (
                function(blogComments) {
                    //debugger;
                    me.blogCommentList = blogComments;
                    for(var [blogComment] in me.blogCommentList) {
                        me.blogCommentList[blogComment].commentDate = new Date(me.blogCommentList[blogComment].commentDate[0],me.blogCommentList[blogComment].commentDate[1] - 1,me.blogCommentList[blogComment].commentDate[2]);
                    }
                },
                function(errResponse) {
                }
            );
    }

});
