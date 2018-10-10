angular.module('CollaborationApp').service('RequestService',function($http,$q,REST_URI){
    
    //Function to fetch pending user list
        this.pendingUserList=function() {
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/user/request/list')
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

        //Function to change status of pending users
         this.changeStatus=function(userId) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/user/request/approval/' + userId)
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

         //Function to fetch the list of pending blogs
        this.pendingBlogList=function() {
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/blog/request/list')
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

        //Function to change status of pending blogs
        this.changeBlogStatus=function(id) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/blog/request/approval/' + id)
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

        //Function to fetch forum join request with pending status
            this.fetchForumRequests=function() {

                var deferred = $q.defer();
                $http.get(REST_URI + '/forum/request/list')
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

        //Function to change status pending forum request
        this.changeFRStatus=function(id) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/forum/request/approval/' + id)
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