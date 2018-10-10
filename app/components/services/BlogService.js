angular.module('CollaborationApp').service('BlogService',function($q,$http,REST_URI){

  	//fetch all blogs
	this.blogList=function() {
		// Create a Deferred object
		var deferred =$q.defer();
		// Call the $http get service
		$http.get(REST_URI+'/blog/list/status')
			 .then(function (response) {
			 	deferred.resolve(response.data);
                 console.log('all approved blogs');
			 },function (errResponse) {
			 	console.error('Error while fetching blogs!');
                 console.log(error);
			 	deferred.reject(errResponse);
		    }
        );

		// return the promise object
		return deferred.promise;	 
	}

	//Adding new blog
	this.addBlog=function(blog){
		var deferred=$q.defer();
    	$http.post(REST_URI+'/blog/new',blog).then(
        function(response){
                deferred.resolve(response.data.responseMessage);
                console.log(response);
        },
        function(error){
                deferred.reject(error);
                console.log(error);
        }
    );
    return deferred.promise;
	} 

	//like the blog
	this.likes=function(id){
		 var deferred = $q.defer();

            $http.post(REST_URI + '/blog/like/' + id).then (

                function(response) {
                    deferred.resolve(response.data);
                }, 
                function (errResponse) {
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
	}

	//view my blog 
	this.viewBlog=function(id){
		
            var deferred = $q.defer();
			console.log(id);
            $http.get(REST_URI + '/user/blogs/list/' + id)
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
    //view single blog 
	this.viewSingleBlog=function(id){
		
            var deferred = $q.defer();
			console.log(id);
            $http.get(REST_URI + '/blog/' + id)
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

    

 //fetch blog comment list
        this.blogCommentlist=function(blogId) {
          
            var deferred = $q.defer();
            
            $http.get(REST_URI + '/blog/comment/list/' + blogId)
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