(function () {

    var app = angular.module('app', ['ngRoute', 'ui.router']);

    app.config(['$logProvider', '$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($logProvider, $routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise("/");

        //$locationProvider.hashPrefix('!');

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: true,
        //    rewriteLinks: true
        //});

        //$routeProvider.when('/', {
        //    controller: 'HomeController',
        //    controllerAs: 'home',
        //    templateUrl: '/app/templates/home.html'
        //})
        //.when('/schools', {
        //    controller: 'AllSchoolsController',
        //    controllerAs: 'schools',
        //    templateUrl: '/app/templates/allSchools.html'
        //})
        //.when('/classrooms', {
        //    controller: 'AllClassroomsController',
        //    controllerAs: 'classrooms',
        //    templateUrl: '/app/templates/allClassrooms.html',
        //    caseInsensitiveMatch: true
        //    //redirectTo: '/schools' /*Will redirect to Routes*/
        //    //redirectTo: function (params, currPath, currSearch) {
        //    //    console.log(params);
        //    //    console.log(currPath);
        //    //    console.log(currSearch);
        //    //    return '/';
        //    //}
        //})
        //.when('/activities', {
        //    controller: 'AllActivitiesController',
        //    controllerAs: 'activities',
        //    templateUrl: '/app/templates/allActivities.html',
        //    resolve: {
        //        activities: function (dataService) {
        //            return dataService.getAllActivities();
        //        }
        //    }
        //})
        //.when('/classrooms/:id', {
        //    controller: 'ClassroomController',
        //    controllerAs: 'classroom',
        //    templateUrl: '/app/templates/classroom.html'
        //})
        //.when('/classrooms/:id/detail/:month?', {
        //    controller: 'ClassroomController',
        //    controllerAs: 'classroom',
        //    templateUrl: '/app/templates/classroomDetail.html'
        //})
        //.otherwise('/');

        $stateProvider.state('home', {

            url: '/',
            templateUrl: '/app/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'home'


        })
            .state('schools', {
                url: '/schools',
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '/app/templates/allSchools.html'
            })
            .state('classrooms', {
                url: '/classrooms',
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '/app/templates/allClassrooms.html',
                onEnter: function ($log) {
                    $log.debug('Entering the classroom state');
                },
                onExit: function ($log) {
                    $log.debug('Exiting the classroom state');
                }
            })
            .state('activities', {
                url: '/activities',
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '/app/templates/allActivities.html',
                resolve: {
                    activities: function (dataService) {
                        return dataService.getAllActivities();
                    }
                },
                data: {
                    name: 'My Activity',
                    desc: 'Fun!'
                },
                foo: {
                    myFoo: 'bar'
                }
            })
            .state('classroom_summary', {
                url: '/classrooms/:id',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                templateUrl: '/app/templates/classroom.html'
            })
             .state('classroom_detail', {
                 url: '/classrooms/{id}/detail/{month}',
                 controller: 'ClassroomController',
                 controllerAs: 'classroom',
                 templateUrl: '/app/templates/classroomDetail.html',
                 params: {
                     classroomMessage: { value: 'Learning is fun!!!' }
                 }
             });
    }]);

    //app.run(['$rootScope', '$log', function ($rootScope, $log) {
    //    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

    //        $log.debug('successfully changed routes');
    //        $log.debug(event);
    //        $log.debug(current);
    //        $log.debug(previous);
    //    });

    //    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

    //        $log.debug('error changed routes');
    //        $log.debug(event);
    //        $log.debug(current);
    //        $log.debug(previous);
    //        $log.debug(rejection);
    //    });
    //}]);

    app.run(['$rootScope', '$log', function ($rootScope, $log) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            $log.debug('successfully changed states');
            $log.debug(event);
            $log.debug(toState);
            $log.debug(toParams);
            $log.debug(fromState);
            $log.debug(fromParams);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

            $log.debug('Requested state not found');
            $log.debug(event);
            $log.debug(unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            $log.debug('Error occured while changing states', error);
            $log.debug(event);
            $log.debug(toState);
            $log.debug(toParams);
            $log.debug(fromState);
            $log.debug(fromParams);
        });
    }]);

}());