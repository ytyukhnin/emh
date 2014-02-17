angular.module('emhApp.Directives',[])
	.directive('timelineJs', ['emhTranslationService', function(emhTranslationService) {
		var htmlTemplate = '<div id="timeline-embed" class="storyjs-embed full-embed"><div id="storyjs" style="position: relative;"></div></div>';

		return {
	      restrict: 'EA',
	      template : htmlTemplate,
	      replace: true,
	      scope: {},
	      link: function(scope, element, attrs) {
	    	  	var timelineResize = function() { element.height($(window).height() - 50)};
	    	  	
				var timelineConfig = {
	//				version:	'2.24',
					debug:		false,
					type:		'timeline',
					id:			'storyjs',
					embed_id:	'timeline-embed',
	//				embed:		true,
	//				width:		'100%',
	//				height:		'100%',
					source: 	'data.json', // TODO: use emhTranslationService.getLanguage('en')
					hash_bookmark: true,
					lang:		emhTranslationService.getLanguage('en'),
	//				font:		'default',
	//				api_keys: {
	//					google: "",
	//					flickr: "",
	//					twitter: ""
	//				},
	//				gmap_key: ""
				};
				VMM.debug = timelineConfig.debug;
				var timeline = new VMM.Timeline(timelineConfig.id);
				timeline.init(timelineConfig);
	
				$(window).resize(timelineResize);
				$(document).ready(timelineResize);
	      }
	  };
}]);