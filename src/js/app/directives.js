angular.module('emhApp.Directives',[])
	.directive('timelineJs', ['emhTranslationService', function(emhTranslationService) {
		var htmlTemplate = '<div id="timeline-embed" class="storyjs-embed full-embed"><div id="storyjs" style="position: relative;"></div></div>';

		return {
	      restrict: 'EA',
	      template : htmlTemplate,
	      replace: true,
	      scope: {
	    	  debug: '@',
	    	  datafile: '@'
	      },
	      link: function(scope, element, attrs) {
			var timelineResize = function() { element.height($(window).height() - 46); };
			
			var timelineConfig = {
//				version:	   '2.24',
				debug:		   scope.debug == "true",
				type:		   'timeline',
				id:			   'storyjs',
				embed_id:	   'timeline-embed',
				start_zoom_adjust:  '-1',
//				embed:		   true,
//				width:		   '100%',
//				height:		   '100%',
				source: 	   scope.datafile,
				hash_bookmark: false,
				lang:		   emhTranslationService.getLanguage('en'),
//				font:		   'default'
			};
			VMM.debug = timelineConfig.debug;
			var timeline = new VMM.Timeline(timelineConfig.id);
			timeline.init(timelineConfig);

			$(window).resize(timelineResize);
			$(document).ready(timelineResize);
	      }
	  };
}]);