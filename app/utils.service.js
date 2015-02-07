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

		// var chunk = function(arr, size) {
		//   var newArr = [];
		//   for (var i=0; i<arr.length; i+=size) {
		//     newArr.push(arr.slice(i, i+size));
		//   }
		//   return newArr;
		// };

		var getDataByType = function(originalArr, type){
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

			return result;
		};

		var getDataByYear = function (datesArr) {
			// Create a new Array & 2 new Object to hold
			var result = [],
			    yearObj = {},
			    monthObj = {};

			// loop through given Array
			for (var i = 0; i < datesArr.length; i++) {
			  var item = datesArr[i],
			      date = new Date(parseInt(item.name, 10)),
			      month = date.getMonth(),
			      year = date.getFullYear(),
			      monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
			                       'July', 'August', 'September', 'October', 'November', 'December' ];

			    // If the object does'nt exist - create it
			   if(yearObj[year] === undefined){
			        yearObj[year] = {};
			    }
			    // If the second object does'nt exist - create it and set it's value to one
			    if(yearObj[year][monthNames[month]] === undefined){
			        yearObj[year][monthNames[month]] = 1;
			    }
			    // Increment the value
			    else {
			        yearObj[year][monthNames[month]]++;
			    }
			}
			// Populate the result array
			for(var prop in yearObj){
			  if(yearObj.hasOwnProperty(prop)){

			    for(var monthItem in yearObj[prop]){
			        if(yearObj[prop].hasOwnProperty(monthItem)){
			           monthObj = {name: monthItem, value: yearObj[prop][monthItem]};
			        }
			    }
			    result.push({name: prop, month: monthObj});
			  }
			}

			return result;
		};

		// Public API
		return {
			prettyUrl: prettyUrl,
			prettyUrlToLower: prettyUrlToLower,
			getDataByType: getDataByType,
			getDataByYear: getDataByYear
		};
	});

}());

