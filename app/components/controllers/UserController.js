angular.module('CollaborationApp').controller('UserController',function(UserService,RegisterService,EventService,BlogService,JobService,$route,$location, $routeParams,$rootScope){

    var me=this;
    me.user = [];

    me.myFriends = [];

    me.friendsCount = [];

    me.myOnlineFriends = [];

    me.countOnlineFriends = [];
    // variables for userProfile Page
    me.contain=[];
    me.forumCount="";
    me.myEvents=[];
    me.jobs=[];
    me.blog=[];
    me.picture=undefined;

    me.user.profile = me.user.profile + '?decached=' + Math.random();

    me.hasApplied = false;

    me.appliedJobCount = []; 

    me.appliedFor = [];

    me.joinedEventCount = [];

    me.myBlogCount = [];
    me.top3Jobs=[];
    me.top3Forums=[];
    me.top5Blogs=[];
     //fetching blogs, forum, jobs and events on the page
    me.fetchContain = function () {
        
        console.log('fetch contain called!');
        UserService.fetchContain()
            .then(
                function(data) {
                    //debugger;
                    me.contain = data;
                    me.top5Blogs=data.top5Blogs;
                    console.log(me.top5Blogs);
                    me.top3Jobs=data.top3Jobs;
                    me.top3Forums=data.top3Forums;
                     for(var [postDate] in  me.contain.top3Events) {
                        me.contain.top3Events[postDate].postDate = new Date(me.contain.top3Events[postDate].postDate[0],me.contain.top3Events[postDate].postDate[1] - 1,me.contain.top3Events[postDate].postDate[2]);   
                    }
                    for(var [startDate] in me.contain.top3Events) {
                        me.contain.top3Events[startDate].startDate = new Date(me.contain.top3Events[startDate].startDate[0],me.contain.top3Events[startDate].startDate[1] - 1,me.contain.top3Events[startDate].startDate[2]);
                    }
                    for(var [endDate] in me.contain.top3Events) {
                        me.contain.top3Events[endDate].endDate = new Date(me.contain.top3Events[endDate].endDate[0],me.contain.top3Events[endDate].endDate[1] - 1,me.contain.top3Events[endDate].endDate[2]);
                    }

                }, function(errResponse) {

                }
            );
    }

//Method to apply for job
    me.applyJob = function(id) {
          JobService.applyJob(id)
            .then (
                function(job) {
                //debugger;
                 $route.reload();
                
                 me.appliedFor.push(id);  
                },
                function(errResponse) {
                }
            );
    }

    //Method to join event
    me.joinEvent = function(id) {
          EventService.joinEvent(id)
            .then (
                function(event) {
                
                 $route.reload();
                
                 me.appliedFor.push(id);  
                },
                function(errResponse) {
                }
            );
    }

     //function to fetch user and user detail
     me.fetchUser = function() {
        var user=$rootScope.user;
         var id = user.userId;
          UserService.fetchUser(id)
                .then (
                    function(user) {
                       // debugger;
                        me.user = user;
                       // me.user.user.birthDate = new Date( me.user.user.birthDate[0], me.user.user.birthDate[1] - 1, me.user.user.birthDate[2]);
                       me.jobs=user.job;
                      
                       me.blog=user.blog;
                        console.log(me.blog);
                        me.myBlogCount = me.user.blog.length;
                        me.joinedEventCount = me.user.joinedEvents.length;
                        me.appliedJobCount = me.user.appliedJobList.length;

                        for(var [postDate] in me.user.events) {
                        me.user.events[postDate].postDate = new Date(me.user.events[postDate].postDate[0],me.user.events[postDate].postDate[1] - 1,me.user.events[postDate].postDate[2]);   
                        }
                        for(var [startDate] in me.user.events) {
                            me.user.events[startDate].startDate = new Date(me.user.events[startDate].startDate[0],me.user.events[startDate].startDate[1] - 1,me.user.events[startDate].startDate[2]);
                        }
                        for(var [endDate] in me.user.events) {
                            me.user.events[endDate].endDate = new Date(me.user.events[endDate].endDate[0],me.user.events[endDate].endDate[1] - 1,me.user.events[endDate].endDate[2]);
                        }
                         for(var [postDate] in me.user.joinedEvents) {
                        me.user.joinedEvents[postDate].postDate = new Date(me.user.joinedEvents[postDate].postDate[0],me.user.joinedEvents[postDate].postDate[1] - 1,me.user.joinedEvents[postDate].postDate[2]);   
                    }
                     for(var [startDate] in me.user.joinedEvents) {
                            me.user.joinedEvents[startDate].startDate = new Date(me.user.joinedEvents[startDate].startDate[0],me.user.joinedEvents[startDate].startDate[1] - 1,me.user.joinedEvents[startDate].startDate[2]);
                        }
                        for(var [endDate] in me.user.joinedEvents) {
                            me.user.joinedEvents[endDate].endDate = new Date(me.user.joinedEvents[endDate].endDate[0],me.user.joinedEvents[endDate].endDate[1] - 1,me.user.joinedEvents[endDate].endDate[2]);
                        }
                    
                    
                    },
                    function(errResponse) {
                        
                    }
                );
     }

// for Friends
    me.fetchMyFriends = function() {
         
          UserService.fetchMyFriends()
            .then (
                function(myFriends) {
                //debugger;
                
                 me.myFriends =  myFriends;
                 //var isOnline=me.myFriends.username;
                 //console.log(isOnline);
                 me.friendsCount =  me.myFriends.length;
                },
                function(errResponse) {
                }
            );

     }

     me.fetchOnlineFriends = function(){
        
         console.log('Showing online friends now!');
         UserService.fetchOnlineFriends()
            .then (
                function(onlineFriends) {
                //debugger;
                 me.myOnlineFriends =  onlineFriends;
                 me.countOnlineFriends =  me.myOnlineFriends.length;
                },
                function(errResponse) {
                }
            );
     }

     //logout function
     me.logout = function(){
      RegisterService.logout()
        .then(

          function(message){   
            $location.path('/landingPage');
                me.error=false;
          },
          function(error){
            me.error=true;
          } 
     );
}

   
             //update user
    me.updateUser = function() {
        var user=$rootScope.user;
        me.user.userId = user.userId;
        me.user.username = user.username;
        UserService.updateUser(me.user)
            .then (
                function(user) {
                    me.user=user;
                    $route.reload();
                    $('updateProfile').modal('hide');
                },
                function(errResponse) {
                }
            );
    } 
});