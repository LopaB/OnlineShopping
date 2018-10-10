angular.module('CollaborationApp').controller('BasicController',function(BasicService,$scope){
    
    var me=this;
    me.user={};
    //me.greeting='This message is comming from angular controller';
    //if it resolve from backend then only the value would be assigned to this variable
  /*  BasicService.getGreeting().then(

        function(greeting){
            me.greeting=greeting;
        },
        function(error){
            console.log(error);
        }
    );
*/
   //view single user function
this.view=function(){
    BasicService.view().then(
        function(response){
            me.user=response;
            console.log(me.user);
        },
        function (error) {
                console.log(me.error);
            }
    );
}

 });