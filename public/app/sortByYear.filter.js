(function () {
	'use strict';
	var app = angular.module('Blogapp');

	// Custom filter to sort data by year
	app.filter('sortByYear', function() {
	  return function (items) {
	    // Create a new Array & 2 new Object to hold
	    var result = [],
	        yearObj = {},
	        monthObj = {};

	    // loop through existing Array
	    for (var i = 0; i < items.length; i++) {
	      var item = items[i],
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
	    // console.log(result);
	    return result;
	  };
	});

}());

