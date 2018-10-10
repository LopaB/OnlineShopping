angular.module('CollaborationApp').controller('ForumController',function(ForumService,$rootScope,$route,$routeParams,$q){

     var me = this;

            //Setting up the field for creating new forum category
            me.Forum = {

                id : null,
                name : '',
                description : '',
                postDate : ''
            }

            //Setting up the field for creating new forum post
            me.ForumPost = {

                id : null,
                title : '',
                description : '',
                postDate : '',
                userId : '',
                username : ''
            }

            //array for displaying list of forum categories
            me.forums = [];

             // For viewing single forum
             me.singleForum = {};

             //Setting up creator of the forum
             me.singleForumUser = {};

             //For list of participated users
             me.participatedUsers = []; 

             //Flag to see whether user is particant or not
            me.isParticipant = false;

            //Flag to check request status
            me.isApproved = false;

            //For storing participant status
            me.participantStatus = "PENDING";

            //For list of forum posts
            me.forumPostsList = [];

            me.forumPostUser = [];

            me.approvedForumsList=[];

            
            //method for adding new category
            me.addForum = function() {
                
                //Setting the user id and username
                var user=$rootScope.user;
                me.Forum.userId = user.userId;
                me.Forum.username = user.username;
                
                ForumService.addForum(me.Forum) 
                        .then(
                            function(forum) {
                                me.Forum = forum;
                                $route.reload();
                               // $modalInstance.close();
                                $('#myModal').modal('hide');
                            }, function(errResponse) {
                                
                            }
                        );
            }

           
            //method to fetch all the forum categories
             me.fetchForums = function() {
                //debugger;
                
                ForumService.fetchForums().then(
                        function(forums) {
                            me.forums = forums;
                    }, function(errResponse) {
                        }
                    );
            }

            //function for viewing single forum
            me.viewForum = function() {
                //Fetch participated users first for this forum
                 me.getParticipatedUsers().then(
                        function(participatedUsers){
                            me.participatedUsers = participatedUsers; //store list of participated users in already defined array
                            var user=$rootScope.user;
                            for(var id in me.participatedUsers) {
                                if(user.userId == me.participatedUsers[id].userId) { 
                                    me.isParticipant = true;  /*If active user is present in the list of participant set the flag as true & store its fetch its request status*/
                                    me.participantStatus = me.participatedUsers[id].status;                       
                                    break;                     
                                }
                            }
                            if(me.participantStatus == "APPROVED") {    //if user is participant
                                         me.isApproved = true;
                            }
                            //fetching single forum page here
                            //Assigning forum id to variable forumId
                            var forumId = $routeParams.id;
                            ForumService.viewForum(forumId)
                                .then (
                                    function(forumModel) {
                                        me.singleForum = forumModel.forum;
                                        me.singleForumUser = forumModel.user;
                                        me.singleForum.postDate = new Date(me.singleForum.postDate[0],me.singleForum.postDate[1] - 1,me.singleForum.postDate[2]);
                                        me.fetchForumPosts();
                                    },
                                    function(errResponse) {
                                    }
                                );
                        } 
                 );

            }

            //Function to send forum join request
            me.joinRequest = function(id) {
                 ForumService.joinRequest(id)
                    .then (
                        function(forum) {
                         $route.reload();
                        
                       //  me.viewForum();

                        },
                        function(errResponse) {
                        }
                    );
            }

            //Function to fetch the list of participated users
            this.getParticipatedUsers=function() {
                var deferred = $q.defer();
                var forumId = $routeParams.id;
                ForumService.getParticipatedUsers(forumId)
                    .then (
                        function(participatedUsers) {
                            
                         deferred.resolve(participatedUsers);
                        },
                        function(errResponse) {
                        }
                    );

                    return deferred.promise;
            }

            //function for adding a new forum post
            me.addForumPost = function () {
                var user=$rootScope.user;
                //Setting the user id and username
               me.ForumPost.userId = user.userId;
               me.ForumPost.username = user.username;
                // me.blogComment.blogId = $routeParams.id;
                //calling the addBlog method in the factory
                ForumService.addForumPost(me.ForumPost)
                    .then (
                        function(ForumPost) {
                            me.ForumPost =  ForumPost;
                            
                            $route.reload();
                             $('#leaveAPost').modal('hide');
                        }, function (errResponse) {
                            
                        }
                    );
                
            }

            //Method to fetch forum posts
            this.fetchForumPosts=function() {
                var forumId = $routeParams.id;
                ForumService.fetchForumPosts(forumId)
                    .then (
                        function(forumPosts) {
                           // debugger;
                            me.forumPostsList = forumPosts;
                            for(var postDate in me.forumPostsList) {
                                me.forumPostsList[postDate].postDate = new Date(me.forumPostsList[postDate].postDate[0],me.forumPostsList[postDate].postDate[1] - 1,me.forumPostsList[postDate].postDate[2]);
                            }
                        },
                        function(errResponse) {
                        }
                    );
            }

            //Function to fetch approved forum List
    me.manageForums = function() {
        
         ForumService.manageForums()
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

             //update forum
    me.updateForum = function() {
        var user=$rootScope.user;
        me.Forum.userId = user.userId;
        me.Forum.username = user.username;
        ForumService.updateForum(me.Forum)
            .then (
                function(forum) {
                    me.Forum=forum;
                    console.log(forum);
                    $route.reload();
                    $('updateForum').modal('hide');
                },
                function(errResponse) {
                }
            );
    }
    //delete forum
    me.deleteForum = function(id) {
        
        ForumService.deleteForum(id)
            .then (
                function(forum) {
                    $route.reload();
                },
                function(errResponse) {
                }
            );
    }

});