angular.module('emhApp.Services', ['ngResource'])
	.service('emhTranslationService', ['$resource', function($resource) {
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