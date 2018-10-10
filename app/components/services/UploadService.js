var upload=angular.module('UploadModule',[]);

 upload.directive('fileModel',['$parse',function($parse){
        return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            console.log(model);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

upload.service('UploadService',['$http', '$q', '$rootScope', '$routeParams','REST_URI',function($http,$q, $rootScope,$routeParams,REST_URI){
    
    // uploadFile function to upload the image on the server
    this.uploadFile = function (file) {
         console.log("inside service uploadfile method");
        var deferred = $q.defer();

        // NOTE: the 'Content-Type' is undefined to add a boundary between the multipart content
        // and other data content which is added automatically thats why here we don't use 
                
        var fd = new FormData();
        fd.append('file', file);
        // send the user id which can be used to update the usera
        // and to set the file name
        var user=$rootScope.user;
        var userId=user.userId;
        fd.append('id', userId);
        $http.post(REST_URI + '/upload/profile-picture', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                console.log(error);
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }

}]);