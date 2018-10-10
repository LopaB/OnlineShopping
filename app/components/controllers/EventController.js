angular.module('CollaborationApp').controller('EventController',function(EventService,$route,$rootScope,$location){

     var me = this;

    ///setting up the fields for creating new event - should be same as fields in the entity class
    me.event = {

        id : null,
        name : ' ',
        venue : '',
        description : '',
        startDate : '',
        endDate : '',
        postDate : '',
    }

    //Fetching list of events
    me.eventlist = [];
    me.user=$rootScope.user;
    

     //function for adding a new event
    me.addEvent = function () {
        
         var startDate = new Date(me.event.startDate).toISOString().slice(0, 10);
          me.event.startDate = startDate;

          var endDate = new Date(me.event.endDate).toISOString().slice(0, 10);
          me.event.endDate = endDate;
         //calling the addevent method in the service
         EventService.addEvent(me.event)
            .then (
                function(event) {
                    debugger;
                    me.event =  event;
                    // console.log(self.blog.id)
                    // var bId = self.blog.id 
                    $location.path('/events/list');
                }, function (errResponse) {
                    console.error('Failure!');
                }
            );
         
    }

    //Function to view list of all events
    this.eventlist=function() {

        // var status = "APPROVED"
       
        EventService.eventlist()
            .then (
                function(events) {
                   
                    me.eventlist = events;
                    console.log(me.eventlist);
                    for(var [events] in me.eventlist) {
                        me.eventlist[events].postDate = new Date(me.eventlist[events].postDate[0],me.eventlist[events].postDate[1] - 1,me.eventlist[events].postDate[2]);
                    }
                     for(var [startDate] in me.eventlist) {
                        me.eventlist[startDate].startDate = new Date(me.eventlist[startDate].startDate[0],me.eventlist[startDate].startDate[1] - 1,me.eventlist[startDate].startDate[2]);
                    }
                     for(var [endDate] in me.eventlist) {
                        me.eventlist[endDate].endDate = new Date(me.eventlist[endDate].endDate[0],me.eventlist[endDate].endDate[1] - 1,me.eventlist[endDate].endDate[2]);
                    }
                },
                function(errResponse) {
                    console.log('Failure!');
                }
            );
    }

     //Method to join event
    me.joinEvent = function(id) {
        
          EventService.joinEvent(id)
            .then (
                function(event) {
                
                 $route.reload();
                 
                 //me.appliedFor.push(id);  
                },
                function(errResponse) {
                }
            );
    }

});