var ChatApp = angular.module('CollaborationApp');

ChatApp.service('ChatService',['$http','$q','$timeout','REST_URI',function($http,$q,$timeout,REST_URI){

    console.log(REST_URI);
    var me = this;
    var service={};
    var listener=$q.defer();
    var socket={client:null,stomp:null};
    var messageIds=[];

    service.Reconnect_Timeout=30000;
    service.Socket_Url=REST_URI+"/chat";
    service.Chat_Topic="/topic/message";
    service.Chat_Broker="/app/chat";
    //service.send=sendMessage;
    //service.receive=receive;

    this.receive=function(){
        return listener.promise;
    }

this.send=function(message){
         var id = Math.floor(Math.random() * 1000000);
        //Message will be sent as JSON object
       socket.stomp.send(
           service.Chat_Broker,
           {priority:9},
           JSON.stringify({message:message,id:id})
       );
       messageIds.push(id);
    }

    me.reconnect=function(){
         $timeout(function(){
            initialize();
        },
        service.Reconnect_Timeout
        );
    }

    me.getMessage=function(data){
        //Transform web socket data to model data
        var message=JSON.parse(data);
        var outMessage={};
        outMessage.message=message.message;
        outMessage.time=new Date(message.time);
       //  if (_.contains(messageIds, message.id)) {
       //   outMessage.self = true;
       //   messageIds = _.remove(messageIds, message.id);
       //   }
        return outMessage;
    }

     me.startListener=function(){
        //listen to the topic message
        socket.stomp.subscribe(service.Chat_Topic,function(data){
            listener.notify(me.getMessage(data.body));
        });
    }

     me.initialize=function(){
        //this is done for setting up the service.
        socket.client = new SockJS("http://localhost:8080/Online-Collaborate/chat");
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, me.startListener);
        socket.stomp.onclose = me.reconnect;
    }
    me.initialize();
    

}]);