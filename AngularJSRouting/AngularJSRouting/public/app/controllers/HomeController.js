(function () {

    angular.module('app')
        .controller('HomeController', ['dataService', 'notifier', '$route', '$log', '$state', HomeController]);

    function HomeController(dataService, notifier, $route, $log, $state) {

        var vm = this;

        vm.message = 'Welcome to School Buddy!';

        //vm.refresh = function () {
        //    $log.debug("$route service");
        //    $log.debug($route.current);
        //    $log.debug($route.routes);
        //    $route.reload();
        //};

        vm.refresh = function () {
            $log.debug("$state service");
            $log.debug($state.current);
            $log.debug($state.routes);
            $state.reload();
        };

        dataService.getAllSchools()
            .then(function (schools) {
                vm.allSchools = schools;
                vm.schoolCount = schools.length;
            })
            .catch(showError);

        dataService.getAllClassrooms()
            .then(function (classrooms) {
                vm.allClassrooms = classrooms;
                vm.classroomCount = classrooms.length;
            })
            .catch(showError);

        dataService.getAllActivities()
            .then(function (activities) {
                vm.allActivities = activities;
                vm.activityCount = activities.length;
            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());