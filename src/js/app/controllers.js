var emhApp = angular.module('emhApp', ['ngCookies', 'emhApp.Services']);
 
emhApp.controller('MainCtrl', 
		['$scope', '$cookies', 'emhTranslationService', function ($scope, $cookies, emhTranslationService){
			emhTranslationService.getTranslation($scope,
						emhTranslationService.getLanguage('en'));
			
			$scope.setLang = function(language) {
				emhTranslationService.getTranslation($scope,
						emhTranslationService.setLanguage(language));
			}
}]);

emhApp.run(['emhTimelineService', function(emhTimelineService) { 
  			emhTimelineService.timeline();
}]);
