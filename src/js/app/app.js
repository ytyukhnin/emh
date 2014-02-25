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
                 templateUrl: 'views/glossary/heavenly100.html'
             }).
             otherwise({
               redirectTo: '/'
             });
	}])
	.run(['$rootScope', '$log', 'emhTranslationService', function($rootScope, $log, emhTranslationService) {
		$rootScope.setTranslation = function(language) {
			emhTranslationService.getTranslation(emhTranslationService.setLanguage(language))
				.then(function(translation) { $rootScope.translation = translation; },
						function(error) { $log.error(error); });
		};
		
		$rootScope.setTranslation(emhTranslationService.getLanguage('en')); // By default
	}]);
