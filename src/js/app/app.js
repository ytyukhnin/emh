angular.module('emhApp', [ 'emhApp.Services', 'emhApp.Directives' ])
	.run(['$rootScope', '$log', 'emhTranslationService', function($rootScope, $log, emhTranslationService) {
		$rootScope.setTranslation = function(language) {
			emhTranslationService.getTranslation(emhTranslationService.setLanguage(language))
				.then(function(translation) { $rootScope.translation = translation; },
						function(error) { $log.error(error); });
		};
		
		$rootScope.setTranslation(emhTranslationService.getLanguage('en')); // By default
	}]);
