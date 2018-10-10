ChatApp.controller('ChatController',['ChatService','$routeParams','$rootScope','$scope',function(ChatService,$routeParams,$rootScope,$scope){

    var me=this;
   me.messages=[];
   me.message="";
   me.max=140;
    var user=$rootScope.user;
    this.myUserName=user.username;
    this.chattee=$routeParams.username;

    me.addMessage=function(){
        ChatService.send(user.username+" - "+me.message);
        me.message="";
    };

    
    ChatService.receive().then(null,null,function(message){
        me.messages.push(message);
    });
     
}]);