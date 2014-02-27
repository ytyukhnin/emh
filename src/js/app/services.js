angular.module('emhApp.Services', ['ngResource'])
	.service('emhFirstRunService', function() {
		return {
			isFirstRun: function() {
				if (localStorage) {
					var frid = 'emh_firstrun';
					var isFirst = localStorage.getItem(frid);
					if(isFirst && isFirst == 1) {
						return false;
					} else {
						localStorage.setItem(frid, 1);
						return true;
					}
				} else {
					return false;
				}
			}
		}
	})
	.service('emhTranslationService', ['$resource', '$q', function($resource, $q) {
	    return {
		    	getTranslation : function(language) {
		    		var version = "201402271821"; // Current translations version
			        var path = 'translations/' + language + '.json';
			        var lsid = 'emh_translations_' + language;
			        var verid = 'emh_translations_ver';
			        var deferred = $q.defer();
			        
			        if (localStorage) {
			        	var readCached = true;
			        	var storedVersion = localStorage.getItem(verid);
			        	if(storedVersion && storedVersion != version) {
			        		readCached = false;
			        	}   	
			            if (localStorage.getItem(lsid) && readCached) {
			            	deferred.resolve(JSON.parse(localStorage.getItem(lsid)));
			            } else {
			                $resource(path).get(function(data) {
			                    localStorage.setItem(lsid, JSON.stringify(data));
			                    localStorage.setItem(verid, version);
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