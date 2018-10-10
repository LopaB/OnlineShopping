angular.module('CollaborationApp').service('ForumService',function($q,$http,$routeParams,$rootScope,REST_URI){
    //function to add a new forum Forum Category
            this.addForum=function(forum) {

                var deferred = $q.defer();

                $http.post(REST_URI + '/forum/new', forum).then(
                    function(response) {
                        //debugger;
                        deferred.resolve(response.data);
                    }, function(errResponse) {
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            }

            //Function to fetch list of forum categories
            this.fetchForums=function() {
                
                var deferred = $q.defer();

                $http.get(REST_URI + '/forum/list').then(
                    function(response) {
                        deferred.resolve(response.data);
                    }, function(errResponse) {
                        deferred.reject(errResponse.data);
                    }
                );
                return deferred.promise;
            }

             //Function for viewing single blog using blog id as a parameter
            this.viewForum=function(id) {
                
                var deferred = $q.defer();

                $http.get(REST_URI + '/forum/' + id)
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

            //Function to send forum join request
            this.joinRequest=function(forumId) {
                
                var deferred = $q.defer();
                var user=$rootScope.user;
                var id = user.userId;
               // var forumId =  $routeParams.id;
                $http.post(REST_URI + '/forum/request/' + id, forumId)
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

            //Function to fetch the list of ParticipatedUsers
            this.getParticipatedUsers=function(id) {
                
                var deferred = $q.defer();
                $http.get(REST_URI + '/forum/participatedUsers/list/' + id)
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
           
            //function to add a new forum post
            this.addForumPost=function(forumPost) {

                var deferred = $q.defer();
                var forumId = $routeParams.id;
                $http.post(REST_URI + '/forum/post/new/' + forumId, forumPost).then(
                    function(response) {
                       // debugger;
                        deferred.resolve(response.data);
                    }, function(errResponse) {
                        deferred.reject(response.data);
                    }
                );
                return deferred.promise;
            }

        //Function to fetch forum post list
        this.fetchForumPosts=function(forumId) {
            console.log('Inside factory now');
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/forum/posts/list/' + forumId)
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

        this.updateForum=function(forum) {

                var deferred = $q.defer();

                $http.post(REST_URI + '/forum/update', forum).then(
                    function(response) {
                        //debugger;
                        deferred.resolve(response.data);
                    }, function(errResponse) {
                        deferred.reject(errResponse.data);
                    }
                );
                return deferred.promise;
            }

             //delete blogs
        this.deleteForum=function(id) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/forum/delete/' + id)
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

        //Function to fetch approved job list
        this.manageForums=function() {
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/forum/manage/list')
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