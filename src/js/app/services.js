var emhAppServices = angular.module('emhApp.Services', ['ngResource']);

emhAppServices.service('emhTranslationService', ['$resource', function($resource) {
	    return {
		    	getTranslation : function(scope, language) {
			        var path = 'translations/' + language + '.json';
			        var lsid = 'emh_translations_' + language;
			        if (localStorage) {
			            if (localStorage.getItem(lsid)) {
			            	scope.translation = JSON.parse(localStorage.getItem(lsid));
			            } else {
			                $resource(path).get(function(data) {
			                    localStorage.setItem(lsid, JSON.stringify(data));
			                    scope.translation = data;
			                });
			            };
			        } else {
			            $resource(path).get(function(data) {
			            	 scope.translation = data;
			            });
			        }
		    	},
		    	
		    	getLanguage : function(defaultLanguage) {
		    		var lsid = 'emh_lang';
			        if (localStorage) {
			        	var storedLand = localStorage.getItem(lsid);
			            if (storedLand) {
			            	return storedLand;	
			            } else {
			            	return defaultLanguage;
			            }
			        } else {
			        	return defaultLanguage;
			        }
		    	},
		    	
		    	setLanguage : function(language) {
		    		var lsid = 'emh_lang';
			        if (localStorage) {
			        	localStorage.setItem(lsid, language);
			        }
			        return language;
		    	}
	    	}
	}]);


emhAppServices
	.factory('emhTimelineService', ['$q', '$rootScope', 'emhTranslationService',
	  function($q, $rootScope, emhTranslationService) {
	    var d = $q.defer();
	    
		var timelineConfig = {
//					version:	'2.24',
					debug:		false,
					type:		'timeline',
					id:			'storyjs',
					embed_id:	'timeline-embed',
//					embed:		true,
//					width:		'100%',
//					height:		'100%',
					source: 	'data.json',
					hash_bookmark: true,
					lang:		emhTranslationService.getLanguage('en'),
//					font:		'default',
//					api_keys: {
//						google: "",
//						flickr: "",
//						twitter: ""
//					},
//					gmap_key: ""
		};
		VMM.debug = timelineConfig.debug;
		var timeline = new VMM.Timeline(timelineConfig.id);
		timeline.init(timelineConfig);
		
		var timelineResize = function() { $("#"+ timelineConfig.embed_id).height($(window).height() - 50)};
			  
		$(window).resize(timelineResize);
		$(document).ready(timelineResize);

		$rootScope.$apply(function() { d.resolve(timeline); });

		return {
	      timeline: function() { return d.promise; }
	    };
}]);