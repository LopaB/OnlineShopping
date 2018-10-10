angular.module('CollaborationApp').controller('JobController',function(JobService,$route,$location){

    var me=this;
    me.job = {

        id : null,
        companyName : ' ',
        subTitle : '',
        about : '',
        jobProfile : '',
        qualification : '',
        contactInfo : '',
        postDate : '',
    }

     me.joblist = [];

     //function for adding a new job
    me.addJob = function () {
        me.postDate = "";
         //calling the addJob method in the service
         JobService.addJob(me.job)
            .then (
                function(job) {
                    me.job =  job;                 
                    $location.path('/jobs/list');

                }, function (errResponse) {
                    console.error('Failure!');
                }
            );
         
    }

    //calling method for joblist
    // joblist();

    //Function to view list of all jobs
    me.joblist=function() {
         JobService.joblist()
            .then (
                function(jobs) {   
                    me.joblist = jobs;
                    for(var [job] in me.joblist) {
                        // console.log(self.bloglist[blog].postDate);
                        me.joblist[job].postDate = new Date(me.joblist[job].postDate[0],me.joblist[job].postDate[1] - 1,me.joblist[job].postDate[2]);
                        // console.log(self.bloglist[blog].postDate);
                    }
                    console.log(me.joblist);
                },
                function(errResponse) {
                    console.log('Failure!');
                }
            );
    }

     //Method to apply for job
    me.applyJob = function(id) {
         JobService.applyJob(id)
            .then (
                function(job) {
                 $route.reload();
                 //me.appliedFor.push(id);  
                },
                function(errResponse) {
                }
            );
    }        
}); 