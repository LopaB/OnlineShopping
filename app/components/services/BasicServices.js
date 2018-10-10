angular.module('CollaborationApp').service('BasicService',function($http,$q,$cookies,REST_URI){

    //view single user
   this.view = function () {
        var deferred = $q.defer();
        var user=$cookies.getObject('user');       
        return user;
    }

       
    
});