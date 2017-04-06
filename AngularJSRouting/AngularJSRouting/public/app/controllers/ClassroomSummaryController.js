(function (undefined) {
    angular.module('app')
        .controller('ClassroomSummaryController', ['classroom', function (classroom) {
            var vm = this;
            vm.schoolPrincipal = classroom.school.principal;
        }]);


})();