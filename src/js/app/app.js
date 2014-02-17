var emhApp = angular.module('emhApp', ['emhTimeline']);

emhApp.run(['emhTimelineService', function(emhTimelineService) 
	      { 
			emhTimelineService.timeline();
	      }]);

