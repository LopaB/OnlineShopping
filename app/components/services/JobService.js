angular.module('CollaborationApp').service('JobService',function($http, $q,$rootScope, REST_URI){

    //Function to add the job 
        this.addJob=function(job) {
            var deferred = $q.defer();

            $http.post(REST_URI + '/job/new', job).then (

                function(response) {
                    deferred.resolve(response.data);
                }, 
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        //Function to fetch job list
       this.joblist=function() {
             console.log('Inside service now');
            var deferred = $q.defer();

            $http.get(REST_URI + '/job/list/status')
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

         //Function to job join
            this.applyJob=function(id) {
                
                var deferred = $q.defer();
                var user=$rootScope.user;
                var userId = user.userId;
                $http.post(REST_URI + '/job/apply/' + id, userId)
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