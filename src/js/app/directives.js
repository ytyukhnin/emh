var emhAppDirectives = angular.module('emhApp.Directives');

emhAppDirectives.directive('timelineJs', ['emhTimelineService', function(emhTimelineService) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
    	  emhTimelineService.timeline().then(function(timeline) {
    		  	$(window).resize(scope.$apply());
    		  
    			scope.timelineConfig = {
//    					version:	'2.24',
    					debug:		false,
    					type:		'timeline',
    					id:			'storyjs',
    					embed_id:	'timeline-embed',
//    					embed:		true,
//    					width:		'100%',
//    					height:		'100%',
    					source: 	'data.json',
    					hash_bookmark: true,
    					lang:		emhTranslationService.getLanguage('en'),
//    					font:		'default',
//    					api_keys: {
//    						google: "",
//    						flickr: "",
//    						twitter: ""
//    					},
//    					gmap_key: ""
    			};
    			VMM.debug = timelineConfig.debug;
    			
    			//var timeline = new VMM.Timeline(timelineConfig.id);
    			timeline.init(timelineConfig);
    		
    			 // Watch for resize event
			    scope.$watch(function() {
			      return angular.element($window)[0].innerWidth;
			    }, function() {
			      scope.render(scope.data);
			    });
    			//var timelineResize = function() { $("#"+ timelineConfig.embed_id).height($(window).height() - 50)};
    			  
    			//$(window).resize(timelineResize);
    			//$(document).ready(timelineResize);
        });
      }};
  }]);