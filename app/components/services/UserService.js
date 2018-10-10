angular.module('CollaborationApp').service('UserService',function($http,$q,$rootScope,$cookies,$location,$routeParams,REST_URI){

    //fetch user's friends
        this.fetchMyFriends=function() {
             var deferred = $q.defer();
             var user = $rootScope.user;
             console.log(user);
            var userId = user.userId;
              $http.get(REST_URI + '/my/friends/' + userId)
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

        //fetch my online friends
         this.fetchOnlineFriends=function() {
             var deferred = $q.defer();

             var user = $rootScope.user;
             var userId = user.userId;
              $http.get(REST_URI + '/my/online/friends/' + userId)
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

        //logout function
     this.logout=function(){
        //debugger;
        var deferred=$q.defer();
        var user=$rootScope.user;
        $http.post(REST_URI+'/logout',user).then(
            function(response){
                $cookies.putObject('user', undefined);
                userIsAuthenticated = false;
                role = 'GUEST';
                deferred.resolve(response);
                 $location.path('/landingPage');
            },
            function (error){
                deferred.reject(error);
                console.log(error);
            }
        );
        return deferred.promise;
    }

     //Function to fetch user event list
         
         this.userEventList=function(id) {
            console.log('Inside user service now');
            var deferred = $q.defer();

            $http.get(REST_URI + '/user/events/list/'+ id)
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

        //function to fetch user and user detail
        this.fetchUser=function(id) {
             var deferred = $q.defer();

              $http.get(REST_URI + '/user/'+ id)
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

        //function to fetch main page contain
        this.fetchContain=function() {
             var deferred = $q.defer();

              $http.get(REST_URI + '/main/contain')
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

        this.updateUser=function(user) {

                var deferred = $q.defer();

                $http.post(REST_URI + '/user/update', user).then(
                    function(response) {
                        //debugger;
                        deferred.resolve(response.data);
                    }, function(errResponse) {
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            }

       
});