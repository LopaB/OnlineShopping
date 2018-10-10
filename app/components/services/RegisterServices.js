angular.module('CollaborationApp').service('RegisterService',function($http,$q,$cookies,$rootScope,$location,REST_URI){

var userIsAuthenticated = false;
var role = 'USER';    
var user = false;

    this.setUserIsAuthenticated = function(value) {
        userIsAuthenticated = value;
    }

    this.getUserIsAuthenticated = function() {
        return userIsAuthenticated;
    }

    //Loading user from cookie
    this.loadUserFromCookie=function() {
        user = $cookies.getObject('user');
        if(user){
            userIsAuthenticated = true;
            role = user.role;
        }
        else {
            userIsAuthenticated = false;
            role = 'USER';
        }        
        return user;
    }

    //saving user inside cookie
    this.saveUser = function(user) {
        //debugger;
        $cookies.putObject('user',user);
        role = user.role;
        userIsAuthenticated = true;        

    }

    this.setRole = function(value) {
        role = value;
    }

    this.getRole = function() {
        return role;
    }

   

//register function
this.register=function(user){

    console.log(user);

    var deferred=$q.defer();
    $http.post(REST_URI+'/user/add',user).then(
        function(response){
                deferred.resolve(response.data.responseMessage);
                console.log(response);
        },
        function(error){
                deferred.reject(error);
                console.error('Error while registering');
        }
    );
    return deferred.promise;
}



 // login function
   this.login =function(user){
        console.log(user);
        //get deferred object
        var deferred=$q.defer();
       
        $http.post(REST_URI+'/user/login',user).then(
            function(response){
                console.log(response);
                deferred.resolve(response.data);
                $cookies.putObject('user',user);
                role = user.role;
                userIsAuthenticated = true;  
                 console.log('Success');
                 console.log(response);
            },
            function (error){
                deferred.reject(error);
                console.log(error);
            }
        );
        return deferred.promise;
    }


// check the username already exists
     this.checkUsername=function(username) {
        var deferred = $q.defer();
        $http.post(REST_URI + '/user/checkusername',username)
        .then(
            function(response){                
                deferred.resolve(response);
                console.log('Success');
            },
            function(error){                
                deferred.resolve(error);
                console.log('Failed');
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
                $rootScope.authenticated = false;
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



//view single user
   this.view = function () {
        var deferred = $q.defer();
        var username=getUser().username;
        $http.get(REST_URI + '/user/view/{username}').then(
            function (response) {
                deferred.resolve(response.data);
                console.log(response);
            },
            function (error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }


    //view all users
   this.viewAll = function () {
       console.log("inside regserv");
        var deferred = $q.defer();
        $http.get(REST_URI + '/user/list').then(
            function (response) {
                deferred.resolve(response.data);
                console.log(response);
            },
            function (error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    }

   


    

});