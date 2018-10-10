angular.module('CollaborationApp').controller('UploadController',function(UploadService,UserService, RegisterService, $rootScope, $scope ,$timeout){

    var me = this;
    // load the user stored inside the cookie
    me.user = $rootScope.user;    
    //var date = new Date(me.user.birthDate.year, me.user.birthDate.monthValue - 1, me.user.birthDate.dayOfMonth + 1).toISOString().slice(0, 10);
    //me.user.birthDate = date;
    me.picture = undefined;

    // the decached technique is used to see the updated image immediately with out page refresh
    me.user.profile =me.user.profile ; 

    // once the controller loads call the jQuery
 //   $timeout(function () {
   //     load();
  //  }, 100);

    // to upload the file    
    me.uploadFile = function () {
        console.log("inside controller uploadfile method");
        console.log(me.picture);
        if(me.picture == undefined) {
            return;
        }    
    	// me.picture will get the value from the directive created previously
    	// it is bind to the HTML input  
        UploadService.uploadFile(me.picture)
        .then(
            function(response){
               // $rootScope.message = 'Profile picture updated successfully!';
                //message contains the pictureId updated in the backend too
                me.user.profile = response.message + '?decached=' + Math.random();
                // update the controller user too
                $rootScope.user.profile = response.message + '?decached=' + Math.random();
                // need to update the cookie value too
                RegisterService.saveUser($rootScope.user);

            },
            function(error){
                console.log(error);
            } 
        )
    };
});