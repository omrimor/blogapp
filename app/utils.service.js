(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('utils', function(){

		var prettyUrl = function(str){
			return str.replace(/[\. ,:-]+/g, '-');
		};

		var prettyUrlToLower = function(str){
			return prettyUrl(str).toLowerCase();

		};

		var getDataByType = function(dataObj, type){
			var originalArr = dataObj.data;
			// Create a new Array & new Object to hold
			var result = [],
			    obj = {};

			if(type) {
			    for (var i = 0; i < originalArr.length; i++) {
			        var item = originalArr[i];

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
			console.log(result);
			return result;
		};


		// Public API
		return {
			prettyUrl: prettyUrl,
			prettyUrlToLower: prettyUrlToLower,
			getDataByType: getDataByType
		};
	});

}());

