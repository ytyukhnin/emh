angular.module('emhApp', [ 'emhApp.Services', 'emhApp.Directives' ])
	.run(['$rootScope', 'emhTranslationService', function($rootScope, emhTranslationService) {
		var setLanguage = function(language) {
			emhTranslationService.getTranslation($rootScope,
					emhTranslationService.setLanguage(language));
		}
		
		setLanguage('en'); // By default
		$rootScope.setLang = setLanguage;
	}]);
