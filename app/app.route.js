window.routes={

    "/landingPage":{
        templateUrl:'app/components/views/landingPage.html',
        controller: 'BasicController',
        controllerAs: 'basicCtrl',
        requiredLogin:false,
        roles:['USER','ADMIN']
    },
     "/about":{
        templateUrl:'app/components/views/about.html',
        controller: 'BasicController',
        controllerAs: 'basicCtrl',
        requiredLogin:false,
        roles:['USER','ADMIN']
    },
    "/contact":{
        templateUrl:'app/components/views/contact.html',
        controller: 'BasicController',
        controllerAs: 'basicCtrl',
        requiredLogin:false,
        roles:['USER','ADMIN']
    },
    
    "/register":{
        templateUrl:'app/components/views/register.html',
        controller: 'RegisterController',
        controllerAs: 'regCtrl',
        requiredLogin:false,
        roles:['USER','ADMIN']
    },
    "/login":{
        templateUrl:'app/components/views/login.html',
        controller: 'RegisterController',
        controllerAs: 'regCtrl',
        requiredLogin:false,
        roles:['USER','ADMIN']
    },
    "/home":{
        templateUrl:'app/components/views/home.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requiredLogin:true,
        roles:['USER']
    },
    "/homeAdmin":{
        templateUrl:'app/components/views/homeAdmin.html',
        controller: 'UserController',
        controllerAs: 'userCtrl',
        requiredLogin:true,
        roles:['ADMIN']
    },
     "/viewUsers":{
        templateUrl:'app/components/views/viewUsers.html',
        controller: 'RegisterController',
        controllerAs: 'regCtrl',
        requiredLogin:true,
        roles:['ADMIN']

    },
     //For accepting requests of user
    "/requests/users": {
        templateUrl : 'app/components/views/userActivation.html',
        controller : 'RequestController',
        controllerAs : 'requestCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },
    "/requests/blogs":{
        templateUrl:'app/components/views/activateBlog.html',
        controller: 'RequestController',
        controllerAs: 'requestCtrl',
        requiredLogin:true,
        roles:['Super_Admin', 'ADMIN']

    },
    "/blog":{
        templateUrl:'app/components/views/viewBlog.html',
        controller: 'BlogController',
        controllerAs: 'blogCtrl',
        requiredLogin:true,
        roles:['USER','ADMIN']

    },
    "/createblog":{
        templateUrl:'app/components/views/createBlog.html',
        controller: 'BlogController',
        controllerAs: 'blogCtrl',
        requiredLogin:true,
        roles:['USER','ADMIN']

    },
    "/myblog":{
        templateUrl:'app/components/views/myBlog.html',
        controller: 'BlogController',
        controllerAs: 'blogCtrl',
        requiredLogin:true,
        roles:['USER','ADMIN']

    },
    "/blog/:blogId":{
        templateUrl:'app/components/views/singleBlog.html',
        controller: 'BlogController',
        controllerAs: 'blogCtrl',
        requiredLogin:true,
        roles:['ADMIN','USER']

    },
    "/manageblog":{
        templateUrl:'app/components/views/manageBlog.html',
        controller: 'AdminController',
        controllerAs: 'adminCtrl',
        requiredLogin:true,
        roles:['ADMIN']

    },
    //For viewing list of all site's members
    "/member/list": {
        templateUrl : 'app/components/views/memberList.html',
        controller : 'FriendController',
        controllerAs : 'friendCtrl',
        requireLogin: true,
        roles: ['USER', 'ADMIN' ]
    },

     //For viewing list of friend request user has received
    "/friendRequest": {
        templateUrl : 'app/components/views/friendRequest.html',
        controller : 'FriendController',
        controllerAs : 'friendCtrl',
        requireLogin: true,
        roles: ['USER', 'ADMIN']
    },
     //For viewing list of friend request user has received
    "/allFriend": {
        templateUrl : 'app/components/views/allfriends.html',
        controller : 'UserController',
        controllerAs : 'userCtrl',
        requireLogin: true,
        roles: ['USER', 'ADMIN']
    },
    "/chat/:id/:username": {
        templateUrl : 'app/components/views/chat.html',
        controller : 'ChatController',
        controllerAs : 'chatCtrl',
        requireLogin: true,
        roles: ['USER','ADMIN']
    },
    //For navigating to error page
    "/error": {
        templateUrl : 'app/components/views/error.html',
        controller : 'RegisterController',
        controllerAs : 'regCtrl',
        requireLogin: false,
        roles: ['GUEST']
    },
    
    "/edit/profile": {
        templateUrl: 'app/components/views/editProfile.html', 
        controller: 'UploadController', 
        controllerAs: 'uploadCtrl',
        requireLogin: true,
        roles: ['USER','ADMIN']
    },
     "/userProfile": {
        templateUrl: 'app/components/views/userProfile.html', 
        controller: 'UserController', 
        controllerAs: 'userCtrl',
        requireLogin: true,
        roles: ['USER','ADMIN']
    },
    //Form for creating new event
    "/event/new": {
        templateUrl : 'app/components/views/newEvent.html',
        controller : 'EventController',
        controllerAs : 'eventCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },

    //For viewing event list
    "/events/list": {
        templateUrl : 'app/components/views/eventlist.html',
        controller : 'EventController',
        controllerAs : 'eventCtrl',
        requireLogin: true,
        roles: ['USER', 'Super_Admin', 'ADMIN']
    },

    //For updating and deleting event
     "/manage/events": {
        templateUrl : 'app/components/views/manageEvent.html',
        controller : 'AdminController',
        controllerAs : 'adminCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },

    //Form for creating new job
    "/job/new": {
        templateUrl : 'app/components/views/newJob.html',
        controller : 'JobController',
        controllerAs : 'jobCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },

    //For viewing job list
    "/jobs/list": {
        templateUrl : 'app/components/views/joblist.html',
        controller : 'JobController',
        controllerAs : 'jobCtrl',
        requireLogin: true,
        roles: ['USER', 'Super_Admin', 'ADMIN']
    },

    //For updating and deleting jobs
     "/manage/jobs": {
        templateUrl : 'app/components/views/manageJob.html',
        controller : 'AdminController',
        controllerAs : 'adminCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },

     //For viewing list of forums and adding a new one
     "/forum/list": {
        templateUrl : 'app/components/views/forumlist.html',
        controller : 'ForumController',
        controllerAs : 'forumCtrl',
        requireLogin: true,
        roles: ['USER', 'ADMIN']
    },

    //For viewing single forum topic
    "/forum/:id": {
        templateUrl : 'app/components/views/forum.html',
        controller : 'ForumController',
        controllerAs : 'forumCtrl',
        requireLogin: true,
        roles: ['USER', 'ADMIN']
    },

    //For viewing single forum topic
    "/manage/forums": {
        templateUrl : 'app/components/views/manageForum.html',
        controller : 'ForumController',
        controllerAs : 'forumCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },

    //For viewing single forum topic
    "/requests/forums": {
        templateUrl : 'app/components/views/forumRequest.html',
        controller : 'RequestController',
        controllerAs : 'requestCtrl',
        requireLogin: true,
        roles: ['Super_Admin', 'ADMIN']
    },


};


app.config(['$routeProvider',function($routeProvider){
    for (var path in window.routes){
        $routeProvider.when(path,window.routes[path]);
    }
/* $routeProvider.otherwise({redirectTo:'/login'});*/
}]);
//specify the the backend url from where you are going to get the values
app.constant('REST_URI','http://localhost:8080/Online-Collaborate');

app.run(function($rootScope,$location,RegisterService) {
    $rootScope.logout = function() {
        // call the logout  function created in AuthenticationService
        RegisterService.logout()
        .then(
            // function callback
            function(message) {
                //$rootScope.message = message;
                $location.path('/landingPage');
            }
        );

    };

   
});

