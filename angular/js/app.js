(function() {
	angular
		.module('todoList', [])
		.controller('MainController', ['$scope', function($scope) {

			$scope.countPerPage = 5;
			$scope.offset = 0;
			$scope.pages= [];
			$scope.pagesNumb=1;
			$scope.currentPage=0;
			$scope.sortFlag = true;

			$scope.newTaskName = '';
			$scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];

			$scope.addTask = function() {
				if ($scope.newTaskName) {
					var taskIdentifier = $scope.taskList.length? ($scope.taskList[$scope.taskList.length-1].id +1) : 1;
					$scope.taskList.push({
						id: taskIdentifier,
						name: $scope.newTaskName,
						done: false
					});
					$scope.newTaskName = '';
				}
			};

			$scope.removeTask = function(taskId) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					if ($scope.taskList[i].id === taskId) {
						if (confirm('Are you sure you want to delete task `' + $scope.taskList[i].name + '` ?')) {
							$scope.taskList.splice(i, 1);
						}
						break;
					}
				}
			};

			$scope.removeAll = function () {
				if(confirm('Are you sure you want to delete all of tasks?')){
					$scope.taskList.splice($scope.offset, $scope.countPerPage);
				}
			};

			$scope.makeTasksDone = function (isDone) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					$scope.taskList[i].done = isDone;
				}
			};

			$scope.changePages = function (fromPage) {
				$scope.offset = $scope.countPerPage * fromPage;
				$scope.currentPage = fromPage;
			};

			$scope.sortTable = function (field) {
				compare = function(task1, task2) {
					if ($scope.sortFlag) {
						return task1[field].localeCompare(task2[field]);
					}
					return task2[field].localeCompare(task1[field]);
				}
				$scope.taskList.sort(compare);
				$scope.sortFlag = !$scope.sortFlag;
			};

		$scope.$watch('taskList', function(newVal, oldVal) {
			$scope.pages= [];
			$scope.pagesNumb= Math.ceil($scope.taskList.length / $scope.countPerPage);
			for (var i = 0; i < $scope.pagesNumb; i++) {
				$scope.pages.push({id:i+1});
			}
			if (newVal !== oldVal) {
				window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
				}
			}, true);

	}]);
})();