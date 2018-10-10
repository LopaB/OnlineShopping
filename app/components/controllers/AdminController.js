angular.module('CollaborationApp').controller('AdminController', function(AdminService,$rootScope,$scope,$route) {
     var me = this;

    //For temparary storing list of users
    me.tempUserList = [];

    //For list of approved user list
    me.approvedUserList = [];

    //For list of approved blog list
    me.approvedBlogList = [];

    //For list of approved job list
    me.approvedJobList = [];

    //For list of event list
    me.eventsList = [];
    //For list of forum list
    me.approvedForumsList=[];

    // get all the users for activation
    me.getUsersForActivation = function() {
        AdminService.getUsersForActivation()
        .then(
            function(users) {                
                me.users = users;
            },
            function(error) {
                console.log(error);
            }
        );
    }
 //Function to fetch approved User List
    me.approveUserList = function() {
        //console.log(userId);
        AdminService.approveUserList()
        .then(
            function(approvedUsers  ) {                
                debugger;
                    var index = 0;  //setting up an var index as 0
                    for (var user in approvedUsers) {   //traversing through array to remove user with Super admin role
                        var role = approvedUsers[user].role; 
                        if( role != 'ADMIN') {    //if role is not super admin add the user to new list
                            me.tempUserList[index++] = approvedUsers[user]; 
                        }
                    }
                    me.approvedUserList = me.tempUserList; //assigning temp user list to approvedUserList
            },
            function(error) {
                $rootScope.message = error.message;
            }
        );
    }    

//Function to fetch approved blog List
    me.approvedBlogList = function() {
        
         AdminService.approvedBlogList()
            .then (
                function(approvedBlogs) {
                    me.approvedBlogList = approvedBlogs; 
                    for (var blogPosted in me.approvedBlogList) {   
                        me.approvedBlogList[blogPosted].blogPosted = new Date(me.approvedBlogList[blogPosted].blogPosted[0],me.approvedBlogList[blogPosted].blogPosted[1] - 1,me.approvedBlogList[blogPosted].blogPosted[2]);
                    }
                },
                function(errResponse) {
                }
            );
    }
    
    //update blog
    me.updateBlog = function(blog) {
        
        AdminService.updateBlog(blog)
            .then (
                function(blog) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }
    //delete blog
    me.deleteBlog = function(blogId) {
        
        AdminService.deleteBlog(blogId)
            .then (
                function(blog) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

    //delete event
    me.deleteEvent = function(id) {
        
        AdminService.deleteEvent(id)
            .then (
                function(event) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

     //update event
    me.updateBlog = function(event) {
        
        AdminService.updateEvent(event)
            .then (
                function(event) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

    //Function to fetch approved event List
    me.fetchEventList = function() {
        
         AdminService.fetchEventList()
            .then (
                function(approvedEvents) {
                    me.eventsList = approvedEvents; 
                    for (var postDate in me.eventsList) {   
                        me.eventsList[postDate].postDate = new Date(me.eventsList[postDate].postDate[0],me.eventsList[postDate].postDate[1] - 1,me.eventsList[postDate].postDate[2]);
                    }
                     for(var startDate in me.eventsList) {
                        me.eventsList[startDate].startDate = new Date(me.eventsList[startDate].startDate[0],me.eventsList[startDate].startDate[1] - 1,me.eventsList[startDate].startDate[2]);
                    }
                     for(var endDate in me.eventsList) {
                        me.eventsList[endDate].endDate = new Date(me.eventsList[endDate].endDate[0],me.eventsList[endDate].endDate[1] - 1,me.eventsList[endDate].endDate[2]);
                    }
                },
                function(errResponse) {
                }
            );
    }

    //Function to fetch approved job List
    me.manageJobs = function() {
        
         AdminService.manageJobs()
            .then (
                function(approvedJobs) {
                    me.approvedJobList = approvedJobs; 
                    for (var postDate in me.approvedJobList) {   
                        me.approvedJobList[postDate].postDate = new Date(me.approvedJobList[postDate].postDate[0],me.approvedJobList[postDate].postDate[1] - 1,me.approvedJobList[postDate].postDate[2]);
                    }
                },
                function(errResponse) {
                }
            );
    }

    //Function to change user role
    me.changeUserRole = function(user) {
        debugger;
        console.log(user.role)
         AdminService.changeUserRole(user)
            .then (
                function(user) {
                   Materialize.toast('User role changed successfully!', 2000);
                   $route.reload();
                },
                function(errResponse) {
                }
            );
    }
//Function to fetch approved forum List
    me.manageForums = function() {
        
         AdminService.manageForums()
            .then (
                function(approvedForums) {
                    me.approvedForumsList = approvedForums; 
                    for (var postDate in me.approvedForumsList) {   
                        me.approvedForumsList[postDate].postDate = new Date(me.approvedForumsList[postDate].postDate[0],me.approvedForumsList[postDate].postDate[1] - 1,me.approvedForumsList[postDate].postDate[2]);
                    }
                },
                function(errResponse) {
                }
            );
    }

   
    //delete forum
    me.deleteJob = function(id) {
        
        AdminService.deleteJob(id)
            .then (
                function(forum) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

});