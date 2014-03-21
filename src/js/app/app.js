angular.module('emhApp', [ 'ngRoute', 'emhApp.Services', 'emhApp.Directives' ])
	.config(['$routeProvider',
         function($routeProvider) {
           $routeProvider.
			when('/', {
				templateUrl: 'views/index.html'
            }).
			when('/about', {
				templateUrl: 'views/about.html'
            }).
			when('/credits', {
				templateUrl: 'views/credits.html'
            }).
			when('/heavenly100', {
				templateUrl: 'views/sections/heavenly100.html'
            }).
			when('/crimea', {
				templateUrl: 'views/sections/crimea.html'
            }).
			when('/euromaidan/:date', {
				templateUrl: function(routeParams) {
					return 'views/euromaidan/'+routeParams.date+'.html';
				}
            }).
			otherwise({
				redirectTo: '/'
            });
	}])
	.run(['$rootScope', '$log', 'emhTranslationService', 'emhFirstRunService', function($rootScope, $log, emhTranslationService, emhFirstRunService) {
		$rootScope.setTranslation = function(language) {
			emhTranslationService.getTranslation(emhTranslationService.setLanguage(language))
				.then(function(translation) { $rootScope.translation = translation; },
						function(error) { $log.error(error); });
		};
		
		$rootScope.setTranslation(emhTranslationService.getLanguage('en')); // By default
		
		$(document).foundation();
		if(emhFirstRunService.isFirstRun()) {
			$(document).foundation('joyride', 'start');
		}
	}]);