(function () {

    angular.module('app')
        .controller('ClassroomController', ['dataService', 'notifier', /*'$routeParams', */'$stateParams',
            ClassroomController]);

    function ClassroomController(dataService, notifier, /*$routeParams, */$stateParams) {

        var vm = this;

        // vm.month = $routeParams.month;

        //dataService.getClassroom($routeParams.id)
        //           .then(function (classroom) {
        //               vm.currentClassroom = classroom;

        //               if ($routeParams.month) {
        //                   if (classroom.activities.length > 0) {
        //                       vm.timePeriod = dataService.getMonthName($routeParams.month);
        //                   }
        //                   else {
        //                       vm.timePeriod = 'No activities this month';
        //                   }
        //               }
        //               else {
        //                   vm.timePeriod = 'All Activities';
        //               }
        //           })
        //           .catch(showError);

        vm.month = $stateParams.month;
        vm.message = $stateParams.classroomMessage;

        dataService.getClassroom($stateParams.id)
                  .then(function (classroom) {
                      vm.currentClassroom = classroom;

                      if ($stateParams.month) {
                          if (classroom.activities.length > 0) {
                              vm.timePeriod = dataService.getMonthName($stateParams.month);
                          }
                          else {
                              vm.timePeriod = 'No activities this month';
                          }
                      }
                      else {
                          vm.timePeriod = 'All Activities';
                      }
                  })
                  .catch(showError);

        function showError() {
            notifier.error(message);
        }

    }

}());