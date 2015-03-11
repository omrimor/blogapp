(function () {
	'use strict';
	var app = angular.module('Blogapp');

	// Custom filter by key in data
	app.filter('byType', function () {
	  return function (items, type) {
	    // Create a new Array & new Object to hold
	    var result = [],
	        obj = {};

	    if(items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];

	            // Check if item is typeOf Array
	            if(Array.isArray(item[type])){
	                for (var j = 0; j < item[type].length; j++) {
	                    if(obj[item[type][j]] === undefined){
	                        obj[item[type][j]] = 1;
	                    }
	                    else{
	                        obj[item[type][j]]++;
	                    }
	                }
	            }
	            else {
	                if(obj[item[type]] === undefined){
	                    obj[item[type]] = 1;
	                }
	                else{
	                    obj[item[type]]++;
	                }
	            }
	        }
	    }

	    // Populate the result array
	    for(var prop in obj){
	      if(obj.hasOwnProperty(prop)){
	        result.push({name: prop, num: obj[prop]});
	      }
	    }
	    return result;
	  };
	});

}());

