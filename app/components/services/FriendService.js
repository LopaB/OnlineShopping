angular.module('CollaborationApp').service('FriendService',function($http,$q,$routeParams,$cookies,REST_URI){

    var me=this;
    me.userId=false;
    //fetch users 
        this.fetchUsers=function(id) {
            //debugger;
            var deferred = $q.defer();

            //var userId = user.userId;
           // me.userId=RegisterServices.loadUserFromCookie().userId;
            $http.get(REST_URI + '/user/friends/model/' + id)
                .then (
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
        }

        //send friend request
         this.sendRequest=function(id) {
            var deferred = $q.defer();
            
            var initId = $cookies.getObject('user').userId;
            console.log(initId);
            console.log(id);
            $http.post(REST_URI + '/user/friendRequest/' + id, initId)
                .then (
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
        }

        //fetch friend requests
        this.fetchRequest=function() {
            var deferred = $q.defer();
            var userId = $cookies.getObject('user').userId;
            //var userId = user.id
            $http.get(REST_URI + '/user/friendRequest/list/' + userId)
                .then (
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
        }

        //approve friend request
        this.approveRequest=function(userId) {
            //debugger;
            var deferred = $q.defer();
            console.log(userId);
           var id = $cookies.getObject('user').userId;
            $http.post(REST_URI + '/user/friendRequest/approve/' + userId, id)
                .then (
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
        }

        //check user's friends
        this.checkUsersFriends=function() {
             var deferred = $q.defer();

            //var userId = user.id
            $http.get(REST_URI + '/user/friends/check/' + me.userId)
                .then (
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function(errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
        }
});