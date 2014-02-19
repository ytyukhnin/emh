angular.module('emhApp.Services', ['ngResource'])
	.service('emhTranslationService', ['$resource', '$q', function($resource, $q) {
	    return {
		    	getTranslation : function(language) {
		    		var deferred = $q.defer();
			        var path = 'translations/' + language + '.json';
			        var lsid = 'emh_translations_' + language;
			        if (localStorage) {
			            if (localStorage.getItem(lsid)) {
			            	deferred.resolve(JSON.parse(localStorage.getItem(lsid)));
			            } else {
			                $resource(path).get(function(data) {
			                    localStorage.setItem(lsid, JSON.stringify(data));
			                    deferred.resolve(data);
			                }, function(error) {
				            	deferred.reject(error);
				            });
			            };
			        } else {
			            $resource(path).get(function(data) {
			            	deferred.resolve(data);
			            }, function(error) {
			            	deferred.reject(error);
			            });
			        }
			        return deferred.promise;
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
	    	};
	}]);