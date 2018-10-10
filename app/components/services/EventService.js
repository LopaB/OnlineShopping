angular.module('CollaborationApp').service('EventService',function($http, $q,$rootScope, REST_URI){

     //Function to add the blog 
        this.addEvent=function(event) {
            var deferred = $q.defer();
    
            $http.post(REST_URI + '/events/new', event).then (

                function(response) {
                    deferred.resolve(response.data);
                }, 
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        //Function to fetch list of events
        this.eventlist=function() {
             console.log('Inside service now');
            var deferred = $q.defer();
            $http.get(REST_URI + '/events/list/status')
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

            //Function to join event
            this.joinEvent=function(id) {
                
                var deferred = $q.defer();
                var user=$rootScope.user;
                var userId = user.userId;
                $http.post(REST_URI + '/event/join/' + id, userId)
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