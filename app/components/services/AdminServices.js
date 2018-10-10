angular.module('CollaborationApp').service('AdminService',function($http,$q,REST_URI){
     // return the user for activation
    this.getUsersForActivation = function() {

        var deferred = $q.defer();

        $http.get(REST_URI + '/admin/user-activation')
        .then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error){
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }


    // return the text after approving the user
    this.approveUserList = function() {
        var deferred = $q.defer();
        $http.put(REST_URI + '/user/manage/list')
        .then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(error){
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }

    //Function to fetch approved blog list
        this.approvedBlogList=function() {
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/blog/manage/list')
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

         //delete blogs
        this.deleteBlog=function(blogId) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/blog/delete/' + blogId)
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

         //delete blogs
        this.updateBlog=function(blog) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/blog/update' , blog)
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
        this.manageJobs=function() {
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/job/manage/list')
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

         //Function tochange user role
        this.changeUserRole=function(user) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/user/role/manage',user)
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

        //Function to fetch approved event list
        this.fetchEventList=function() {
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/event/manage/list')
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

         //delete blogs
        this.deleteEvent=function(id) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/event/delete/' + id)
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

         //delete blogs
        this.updateEvent=function(event) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/event/update' , event)
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

        
        
         //delete job
        this.deleteJob=function(id) {
            var deferred = $q.defer();
            
            $http.post(REST_URI + '/job/delete/' + id)
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