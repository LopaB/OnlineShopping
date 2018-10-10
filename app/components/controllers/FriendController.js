angular.module('CollaborationApp').controller('FriendController',function(FriendService,RegisterService,$q,$rootScope,$routeParams,$location,$route){

    var me=this;
    me.userlist=[];
    me.tempuser=[];
    me.countuser={};
    me.sendrequest=[];
    me.friendrequest=[];
    me.friendrequestcount={};

    //Function to fetch site users will come here
    me.fetchusers = function() {
        var user=$rootScope.user;
        var id=user.userId;
        FriendService.fetchUsers(id)
            .then (
                function(user) {
                    console.log(user);
                   //debugger;
                    // var index = 0;  //setting up an var index as 0
                    // for (var tempuser in  list.usersToBefriend) {   //traversing through array to remove user with same id as that of logged in user
                    //     var tempId = list.usersToBefriend[tempuser].id;
                    //     if( tempId != user.id) {  //if it is not user id set it inside another array
                    //          self.tempUsers[index++] =  list.usersToBefriend[tempuser]; 
                    //     }
                    // }
                     me.userlist = user;
                     //for(var birthDate in  me.userslist) {
                        // me.userslist[birthDate].birthDate = new Date(me.userslist[birthDate].birthDate[0], me.userslist[birthDate].birthDate[1] - 1, me.userslist[birthDate].birthDate[2]);
                   // }
                    me.countuser = me.userlist.length;
                }, function (errResponse) {
                }
            );
    }

    //function to send friend request
    me.sendRequest = function(userId) {
       // debugger;
      // var id=$routeParams.userId;
       console.log('from controller');
       console.log(userId);
        FriendService.sendRequest(userId)
            .then (
                function(friend) {
                    //debugger;
                    $route.reload();
                    // me.sentrequest = true;
                },function(errResponse) {

                }
            );
    }

    //function to fetch the friend list
    me.fetchRequest = function() {
        FriendService.fetchRequest()
            .then (
                function(friendrequest) {
                    me.friendrequest = friendrequest;
                     me.friendrequestcount = me.friendrequest.length;
                },function(errResponse) {

                }
            );
    }


    //function to approve friend request
    me.approveRequest = function(userId) {
       // var id=$routeParams.id;
        FriendService.approveRequest(userId)
            .then (
                function(friendrequest) {
                    $route.reload();
                     console.log('friend request accepted!');
                },function(errResponse) {

                }
            );
    }

    //Function to check user's friends
    // me.checkUsersFriends = function() {
    //     debugger;

    //     var deferred = $q.defer();


    //     friendFactory.checkUsersFriends()
    //         .then (
    //             function(friendlist) {
    //                 deferred.resolve(friendlist);
    //                 // self.setFlags();

    //             },function(errResponse) {
    //                 deferred.reject(errResponse);
    //             }
    //         );

    //         return deferred.promise;
    // }

    // me.setFlags = function(id) {
        
    //     debugger;

    //     self.checkUsersFriends().then(

    //         function(friendlist) {
    //             debugger;
    //             self.usersFriends = friendlist;
    //             for (var friend in  self.usersFriends) {
    //                     if(id == friend.id) {
    //                         self.hasSentRequest = true;
    //                     }
    //                 }
    //         }
    //     )
        
    // }
        
});