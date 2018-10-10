angular.module('CollaborationApp').controller('RequestController',function(RequestService,$rootScope,$route){

    var me=this;
    //For storing list of pending users
    me.pendingUsers = [];

    //For list of pending blogs
    me.pendingBlogs = [];

     me.forumRequest = [];

    //Function to view list of all pending users
        me.pendingUserList = function() {

        // var status = "APPROVED"
        
        RequestService.pendingUserList().then (
                function(pendingUsers) {
               
                    me.pendingUsers = pendingUsers;
                   //for(var birthDate in me.pendingUsers) {
                    //    me.pendingUsers[birthDate].birthDate = new Date(me.pendingUsers[birthDate].birthDate[0],me.pendingUsers[birthDate].birthDate[1] - 1,me.pendingUsers[birthDate].birthDate[2]);
                    //}
                    console.log(me.pendingUsers); 
                    console.log(me.pendingUsers.length);
                    $rootScope.notifyUserCount = me.pendingUsers.length;                   
                },
                function(errResponse) {
                }
            );
    }

    //Function to change status of user registration
    me.changeStatus = function(userId) {
        
        RequestService.changeStatus(userId)
            .then (
                function(user) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

 //Function to fetch pending blog list
    me.pendingBlogList = function() {
         RequestService.pendingBlogList()
            .then (
                function(pendingBlogs) {
                    me.pendingBlogs = pendingBlogs;
                    for(var blogPosted in me.pendingBlogs) {
                        me.pendingBlogs[blogPosted].blogPosted = new Date(me.pendingBlogs[blogPosted].blogPosted[0],me.pendingBlogs[blogPosted].blogPosted[1] - 1,me.pendingBlogs[blogPosted].blogPosted[2]);
                    }
                },
                function(errResponse) {
                }
            );

    }

    //Function to change blog status
    me.changeBlogStatus = function(id) {
        //debugger;
         RequestService.changeBlogStatus(id)
            .then (
                function(blog) {
                    $route.reload();
                    
                    me.pendingBlogList();
                     
                },
                function(errResponse) {
                }
            );
    }

    
            //Function to fetch forum requests
            me.fetchForumRequests = function() {
                
                RequestService.fetchForumRequests()
                    .then (
                        function(forumRequests) {
                           me.forumRequest = forumRequests;
                        },
                        function(errResponse) {
                        }
                    );

            }

            //Function to change status of forumRequests
            me.changeFRStatus = function(id) {
                
                RequestService.changeFRStatus(id)
                    .then (
                        function(forumRequest) {
                            $route.reload();
                        },
                        function(errResponse) {
                        }
                    );
    }

});