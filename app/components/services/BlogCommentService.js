angular.module('CollaborationApp').service('BlogCommentService',function($http, $q, $routeParams,REST_URI){
    //add a new blog comment
            this.addBlogComment=function(blogComment) {

                var deferred = $q.defer();
                var blogId = $routeParams.blogId;
                $http.post(REST_URI + '/blog/comment/new/' + blogId, blogComment).then(
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