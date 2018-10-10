angular.module('CollaborationApp').controller('BlogCommentController',function(BlogCommentService,$cookies, $routeParams, $location){

    var me=this;
    me.blogComment = {

        blogCommentId : null,
        blogComment : ' ',
        commentDate : '',
        userId : '',
        username : '',
    }

    //add new blog comment
    me.addBlogComment = function () {

        //Setting the user id and username
        me.blogComment.userId = user.userId;
        me.blogComment.username = user.username;
         //calling the addBlog method in the factory
         BlogCommentService.addBlogComment(me.blogComment)
            .then (
                function(blogComment) {
                    me.blogComment =  blogComment;
                    var bId = me.blogComment.blogCommentId; 
                    $location.path('/blog/' + bId);
                }, function (errResponse) {
                    console.error('Failure!');
                }
            );
         
    }

});