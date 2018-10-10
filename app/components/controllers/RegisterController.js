angular.module('CollaborationApp').controller('RegisterController', function(RegisterService,$rootScope,$scope,$location,$route) {
    //declaring me object
    var me = this;

    
    me.users={};
    me.message = '';
    me.error=false;
    me.authError=false;
    me.usernameExist = false;
    me.temp=[];

    me.user = {
        userId :  null,
        username : '',
        fullname : '',
        password : '',
        confirmpassword : '',
        email : '',
        gender : '',
        role:''
    };

    //register function
    me.register = function () {
       // debugger;
        
        RegisterService.register(me.user).then(
            function (user) {
                RegisterService.setUserIsAuthenticated(false);
                me.register=true;
                $rootScope.msg = "Registration successful! You will get an email after approval.";
                $route.reload();
                $location.path("/landingPage");
          
            },
            function (error) {
               RegisterService.setUserIsAuthenticated(false);
                $rootScope.authenticated = false;
                me.error = true;
                console.log(me.user);
            }
        );
    }

    // login function
    me.login = function(){
       // debugger;
        RegisterService.login(me.user).then(

          function(user){  
              //debugger;

              /*if(me.users.username == null || me.users.password == null) {
                    me.error = true;
                    $rootScope.message = "Please provide both username and password";
                }
                else*/ if(user.username == null || user.password == null) {
                    me.error = true;
                    $rootScope.message = "Incorrect username or password";
                } else if(user.status == 'PENDING') {
                    me.error = true;
                    $rootScope.message = "Apparently your registeration request is not approved yet!";
                } else if(user.status == 'REJECT') {
                    me.error = true;
                    $rootScope.message = "Your registeration request has been rejected!";
                } 
                else{
                   // debugger;
                     RegisterService.setUserIsAuthenticated(true);
                     console.log(user);
                     RegisterService.setRole(user.role);
                     $rootScope.authenticated = true;
                     $rootScope.message = "Welcome  " + user.username;
                     $rootScope.user=user;
                     RegisterService.saveUser(user);
                     switch(user.role) {
                        case 'Super_Admin':
                            me.isSuperAdmin = true;
                            $location.path('/homeAdmin');
                            break;
                        case 'ADMIN':
                            me.isAdmin = true;
                            $location.path('/homeAdmin');
                            break;
                        case 'USER' :
                            me.isUser = true;
                            $location.path('/home');
                            break;
                        default :
                            $location.path('/landingPage');
                    }
                    $rootScope.isLogin = true;
                }   
        
          },
          function(error) {            
            RegisterService.setUserIsAuthenticated(false);
            $rootScope.authenticated = false;
            me.error = true;
          }
        );
    }




    //logout function
     me.logout = function(){
      RegisterService.logout()
        .then(

          function(message){   
            $location.path('/landingPage');
                me.error=false;
          },
          function(error){
            me.error=true;
          } 
     );
}
 //Method to check whether username already exist
    me.checkUsername = function () {
        debugger;
        var username = me.user.username;
        //If username is undefined and has some characters
        if( username !== undefined && username.length > 0) {

        RegisterService.checkUsername(username).then (
            function (response ) {
               debugger;
                if(response.status === 302) {
                    me.usernameExist = true;
                    //setting the validity as false if the username already exist
                    $scope.register.reg_username.$setValidity("reg_username", false)
                } else {
                    me.usernameExist = false;
                    //setting the validity as true if the username already exist
                    $scope.register.reg_username.$setValidity("reg_username", true)
                }
            }, function (error) {
                self.usernameExist = false;
                $scope.register.reg_username.$setValidity("reg_username", true)
            }
        );
    }
    }
       
    //view single user function
me.view=function(){
    RegisterService.view().then(
        function(response){
            me.user=response;
            console.log(me.user);
        },
        function (error) {
                console.log(me.error);
            }
    );
}

//view all user function
me.viewAll=function(){
    console.log("inside regctrl");
    RegisterService.viewAll().then(
        function(response){
            me.users=response;
            console.log(me.users);
        },
        function (error) {
                console.log(me.users);
            }
    );
}

      
    

});