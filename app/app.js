'use strict';

define([
	'angular',
	'angularRoute',	
	'bootstrap'
], function (angular, angularRoute, bootstrap){

	var fightQuestApp = angular.module('fightQuestApp', ['ngRoute']);	

	fightQuestApp.controller('athleteController', function($scope, athleteService){
		$scope.projectName= 'Fight Quest'

		$scope.buttonDelete = 'Delete';
		$scope.buttonSave = 'Save';

		$scope.athletes = [];
		$scope.athlete = {};

		$scope.init = function () {
			$scope.athlete = {};
			$scope.athletes = athleteService.listAll();		
		};

		$scope.save = function (){		
			athleteService.save($scope.athlete);
			this.init();		
		};

		$scope.delete = function (athlete){
			athleteService.delete(athlete);
			this.init();
		};

		$scope.init();
	});

	fightQuestApp.factory('athleteService', function(){
		var athletes = [];

		var athleteService = {};

		athleteService.listAll = function(){
			return athletes;
		}

		athleteService.save = function(athlete){
			athletes.push(angular.copy(athlete));
		};

		athleteService.delete = function(athlete){
			var index = athletes.indexOf(athlete);
			athletes.splice(index, 1);
		};

		return athleteService;
	});


	fightQuestApp.config(['$routeProvider', '$locationProvider', 
		function ($routeProvider, $locationProvider){
			$routeProvider
				.when('/athletes/', {
					templateUrl: 'page/athlete/list.html',
					controller: 'athleteController'
				})
				.when('/athletes/add', {
					templateUrl: 'page/athlete/add.html',
					controller: 'athleteController'
				});
	}]);

	fightQuestApp.value('projectName', 'Fight Quest');

	return fightQuestApp;	
});