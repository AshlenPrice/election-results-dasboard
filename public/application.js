webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// load manifests
	// scripts

	__webpack_require__(1);

	// styles
	__webpack_require__(12);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var setAPIOrigin = __webpack_require__(3);
	var config = __webpack_require__(6);

	$(function () {
	  setAPIOrigin(location, config);
	});

	// function to handle form submission and serialization
	var formSerializization = function formSerializization() {
	  // this part of the function throws an error when active
	  //  Error may be due to .serialize() method
	  // $(".debug").text($("#myForm").serialize());
	  //     alert( "Thank you for your submission" );
	};
	$(".btn").on("submit", formSerializization);

	// use require without a reference to ensure a file is bundled
	__webpack_require__(7);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var parseNestedQuery = __webpack_require__(4);

	/*
	  possibilites to handle and example URLs:

	  client local, api local
	    http://localhost:7165/
	  client local, api remote
	    http://localhost:7165/?environment=production
	  client remote, api local
	    https://ga-wdi-boston.github.io/browser-template/?environment=development
	    This will require allowing "unsafe scripts" in Chrome
	  client remote, api remote
	    https://ga-wdi-boston.github.io/browser-template/
	*/

	var setAPIOrigin = function setAPIOrigin(location, config) {
	  // strip the leading `'?'`
	  var search = parseNestedQuery(location.search.slice(1));

	  if (search.environment === 'development' || location.hostname === 'localhost' && search.environment !== 'production') {
	    if (!(config.apiOrigin = config.apiOrigins.development)) {
	      var port = +'GA'.split('').reduce(function (p, c) {
	        return p + c.charCodeAt().toString(16);
	      }, '');
	      config.apiOrigin = 'http://localhost:' + port;
	    }
	  } else {
	    config.apiOrigin = config.apiOrigins.production;
	  }
	};

	module.exports = setAPIOrigin;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var addNestedValue = __webpack_require__(5);

	var parseNestedQuery = function parseNestedQuery(queryString) {
	  return queryString.split('&').reduce(function (memo, element) {
	    if (element) {
	      var keyValuePair = element.split('=');
	      memo = addNestedValue(memo, keyValuePair[0], keyValuePair[1]);
	    }

	    return memo;
	  }, {});
	};

	module.exports = parseNestedQuery;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var addNestedValue = function addNestedValue(pojo, name, value) {
	  var recurse = function recurse(pojo, keys, value) {
	    value = decodeURIComponent(value);
	    var key = decodeURIComponent(keys.shift());
	    var next = keys[0];
	    if (next === '') {
	      // key is an array
	      pojo[key] = pojo[key] || [];
	      pojo[key].push(value);
	    } else if (next) {
	      // key is a parent key
	      pojo[key] = pojo[key] || {};
	      recurse(pojo[key], keys, value);
	    } else {
	      // key is the key for value
	      pojo[key] = value;
	    }

	    return pojo;
	  };

	  var keys = name.split('[').map(function (k) {
	    return k.replace(/]$/, '');
	  });
	  return recurse(pojo, keys, value);
	};

	module.exports = addNestedValue;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	var config = {
	  apiOrigins: {
	    production: 'https://ga-wdi-boston.herokuapp.com'
	  }
	};

	module.exports = config;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var electionData = __webpack_require__(8);

	zingchart.THEME = "classic";
	zingchart.loadModules('maps, maps-usa');

	var listOfStates = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"];

	var elecMapData = {
	  "graphset": [{
	    "background-color": "#9DDCF9",
	    "type": null,
	    "title": {
	      "text": "PRESIDENTIAL ELECTION RESULTS 2008",
	      "font-color": "#000",
	      "background-color": "none"
	    },
	    "shapes": [{
	      "type": "zingchart.maps",
	      "options": {
	        "zooming": false,
	        "panning": false,
	        "scrolling": false,
	        "id": "map",
	        "name": "usa",
	        "style": {
	          "hover-state": {
	            "alpha": 0.3,
	            "border-color": "#555",
	            "border-width": 1
	          },
	          "items": {}, //items
	          "tooltip": {
	            "font-color": "#000",
	            "font-size": 15,
	            "border-width": 2,
	            "border-color": "#FFF"

	          } //style
	        } // options
	      } // shape object
	    }] // shapes array
	  }] // graphset array
	};

	// renders map of 2008 cycle
	zingchart.render({
	  id: 'cycleTwoMap',
	  data: elecMapData,
	  height: 500,
	  width: 725,
	  modules: 'results-08'
	});

	// zingchart.defineModule('results-08', 'plug-in', function(originalJson) {
	//
	//   console.log(electionData);
	//   if (data.shapes[0].options) {
	//     let options = data.shapes[0].options
	//     let mapType = options.name
	//
	//
	//     let items = {}
	//
	//     for (let key in options.style.items) {
	//       let item = options.style.items[key];
	//       let name = item.name;
	//       let value = item.value;
	//
	//       let keyInfo = zingchart.maps.getItemInfo(options.name, key)
	//
	//     }
	//   }
	// })


	// let usData = {
	//     "graphset": [
	//         {
	//             "background-color": "#9DDCF9",
	//             "type": null,
	//             "title": {
	//                 "text": "PRESIDENTIAL ELECTION RESULTS 2008",
	//                 "font-color": "#000",
	//                 "background-color": "none"
	//             },
	//             "shapes": [
	//                 {
	//                     "type": "zingchart.maps",
	//                     "options": {
	//                         "id": "map",
	//                         "name": "usa",
	//                         "scale": true,
	//                         "y": "25px",
	//                         "style": {
	//                             "label":{
	//                               "visible":false
	//                             },
	//                             "items": {
	//                                 "WA": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Washington<br><br>Jay Inslee (D)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "OR": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Oregon<br><br>John Kitzhaber (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "CA": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "California<br><br>Jerry Brown (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "NV": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Nevada<br><br>Brian Sandoval (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "ID": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Idaho<br><br>C.L. “Butch” Otter (R)<br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MT": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Montana<br><br>Steve Bullock (D)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "WY": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Wyoming<br><br>Matthew Mead (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "UT": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Utah<br><br>Gary R. Herbert (R) <br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "AZ": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Arizona<br><br>Jan Brewer (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "CO": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Colorado<br><br>John Hickenlooper (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "NM": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "New Mexico<br><br>Susana Martinez (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "ND": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "North Dakota<br><br>Jack Dalrymple (R) <br><br>Present Term Began: Jan 2012<br>Present Term Ends: Jan 2016",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "SD": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "South Dakota<br><br>Dennis Daugaard (R)<br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "NE": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Nebraska<br><br>Dave Heineman (R) <br><br>Present Term Began:  Jan 2011<br>Present Term Ends:  Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "KS": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Kansas<br><br>Sam Brownback (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "OK": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Oklahoma <br><br>Mary Fallin (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "TX": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Texas <br><br>Rick Perry (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MN": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Minnesota<br><br>Mark Dayton (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "IA": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Iowa <br><br>Terry Branstad (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "WI": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Wisconsin<br><br>Scott Walker (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "IL": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Illinois<br><br>Pat Quinn (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MI": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Michigan<br><br>Rick Snyder (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "OH": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Ohio<br><br>John Kasich (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MO": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Missouri <br><br>Jay Nixon (D)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "AR": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Arkansas <br><br>Mike Beebe (D)<br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "LA": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Louisiana<br><br>Bobby Jindal (R) <br><br>Present Term Began: Jan 2012<br>Present Term Ends: Jan 2016",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "IN": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Indiana<br><br>Mike Pence (R)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "KY": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Kentucky <br><br>Steven L. Beshear (D) <br><br>Present Term Began: Dec 2011<br>Present Term Ends: Dec 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "TN": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Tennessee <br><br>Bill Haslam (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MS": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Mississippi <br><br>Phil Bryant (R)<br><br>Present Term Began: Jan 2012<br>Present Term Ends: Jan 2016",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "AL": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Alabama<br><br>Robert Bentley (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "GA": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Georgia<br><br>Nathan Deal (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends:  Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "SC": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "South Carolina<br><br>Nikki R. Haley (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "NC": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "North Carolina<br><br>Pat McCrory (R) <br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "WV": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "West Virginia <br><br>Earl Ray Tomblin (D)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "FL": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Florida<br><br>Rick Scott (R)<br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "VA": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Virginia<br><br>Bob McDonnell (R) <br><br>Present Term Began: Jan 2010<br>Present Term Ends: Jan 2014",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "DE": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Delaware <br><br>Jack Markell (D)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2017",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MD": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Maryland<br><br>Martin O’Malley (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "DC": {
	//                                     "visible": false
	//                                 },
	//                                 "NJ": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "New Jersey <br><br>Chris Christie (R) <br><br>Present Term Began: Jan 2010<br>Present Term Ends: Jan 2014",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "PA": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Pennsylvania <br><br>Tom Corbett (R) <br><br>Present Term Began: Jan 2011<br>Present Term Ends:  Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "NY": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "New York<br><br>Andrew Cuomo (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "CT": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Connecticut<br><br>Dan Malloy (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "RI": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Rhode Island <br><br>Lincoln Chafee (D) <br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "MA": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Massachusetts <br><br>Deval Patrick (D)<br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "NH": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "New Hampshire <br><br>Maggie Hassan (D)<br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "VT": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Vermont<br><br>Peter Shumlin (D) <br><br>Present Term Began: Jan 2013<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "ME": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Maine<br><br>Paul LePage (R)<br><br>Present Term Began: Jan 2011<br>Present Term Ends: Jan 2015",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "HI": {
	//                                     "background-color": "#33647a",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Hawaii <br><br>Neil Abercrombie (D)<br><br>Present Term Began: Dec 2010<br>Present Term Ends: Dec 2014",
	//                                         "text-align": "left",
	//                                         "border-color": "#33647a",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 },
	//                                 "AK": {
	//                                     "background-color": "#ef4156",
	//                                     "border-color": "#fff",
	//                                     "tooltip": {
	//                                         "text": "Alaska <br><br>Sean Parnell (R) <br><br>Present Term Began: Dec 2010<br>Present Term Ends: Dec 2014",
	//                                         "text-align": "left",
	//                                         "border-color": "#ef4156",
	//                                         "border-width": 2,
	//                                         "shadow": 0
	//                                     }
	//                                 }
	//                             },
	//                             "hover-state": {
	//                                 "alpha": 0.3,
	//                                 "border-color": "#555",
	//                                 "border-width": 1
	//
	//                             }
	//                         }
	//                     }
	//                 }
	//             ]
	//         }
	//     ]
	// };
	//
	// zingchart.render({
	// 	id : 'myChart',
	// 	data : usData,
	// 	height: 350,
	// 	width: 330
	// });

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// imports parsed JSON file

	var _results_ = __webpack_require__(9);

	var _results_2 = _interopRequireDefault(_results_);

	var _results_3 = __webpack_require__(10);

	var _results_4 = _interopRequireDefault(_results_3);

	var _results_5 = __webpack_require__(11);

	var _results_6 = _interopRequireDefault(_results_5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// empty object to push new data into
	var twoThousandAndFourCycle = [];
	var twoThousandAndEightCycle = [];
	var twoThousandAndTwelveCycle = [];

	// 2004 cycle
	for (var state in _results_2.default) {
	  if (_results_2.default.hasOwnProperty(state)) {
	    //  console.log(cycleOne[state])
	    for (var candidate in _results_2.default[state]) {
	      if (_results_2.default[state].hasOwnProperty(candidate)) {
	        // console.log(cycleOne[state][candidate])
	        var electObj = _results_2.default[state][candidate];
	        // console.log(electObj)
	        twoThousandAndFourCycle.push(electObj);
	      }
	    }
	  }
	}

	console.log(twoThousandAndFourCycle[2].name

	//calculate winner per state
	// let winningCandidate = [];

	// twoThousandAndFourCycle.forEach(function (state) {
	//   state.
	// })

	// function winCandidate(electObj) {
	//
	//   return electObj.votes.reduce(function(a,b){
	//       console.log(electObj.votes);
	//     return Math.max(a-b)
	// })

	);var stateObj = new Object();

	// 2008 cycle
	for (var _state in _results_4.default) {
	  if (_results_4.default.hasOwnProperty(_state)) {
	    //  console.log(cycleTwo[state])
	    for (var _candidate in _results_4.default[_state]) {
	      if (_results_4.default[_state].hasOwnProperty(_candidate)) {
	        //  console.log(cycleTwo[state][candidate])
	        var _electObj = _results_4.default[_state][_candidate];
	        //  console.log(electResutObj)
	        twoThousandAndEightCycle.push(_electObj);
	      }
	    }
	  }
	}
	console.log(twoThousandAndEightCycle[0]

	// 2012 cycle
	);for (var _state2 in _results_6.default) {
	  if (_results_6.default.hasOwnProperty(_state2)) {
	    //  console.log(cycleThree[state])
	    for (var _candidate2 in _results_6.default[_state2]) {
	      if (_results_6.default[_state2].hasOwnProperty(_candidate2)) {
	        //  console.log(cycleThree[state][candidate])
	        var _electObj2 = _results_6.default[_state2][_candidate2];
	        //  console.log(electObj)
	        twoThousandAndTwelveCycle.push(_electObj2);
	      }
	    }
	  }
	}

	console.log(twoThousandAndTwelveCycle);

	module.exports = true;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = {
		"2004_AL": {
			"Bush, George W.": {
				"id": "2004_AL",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 1176394,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_AL",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 693933,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_AL",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 6701,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_AL",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 3529,
				"parties": [
					"Independent"
				]
			},
			"Peroutka, Michael": {
				"id": "2004_AL",
				"year": 2004,
				"name": "Peroutka, Michael",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 1994,
				"parties": [
					"Independent"
				]
			}
		},
		"2004_AK": {
			"Bush, George W.": {
				"id": "2004_AK",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 190889,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_AK",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 111025,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_AK",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 5069,
				"parties": [
					"Populist"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_AK",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 2092,
				"parties": [
					"Alaskan Independence"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_AK",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 1675,
				"parties": [
					"Alaska Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_AK",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 1058,
				"parties": [
					"Green"
				]
			}
		},
		"2004_AZ": {
			"Bush, George W.": {
				"id": "2004_AZ",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 1104294,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_AZ",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 893524,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_AZ",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 11856,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2004_AZ",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 2773,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_AZ",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 138,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_AR": {
			"Bush, George W.": {
				"id": "2004_AR",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 572898,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_AR",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 469953,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_AR",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 6171,
				"parties": [
					"Populist Party Of Arkansas"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_AR",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 2352,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_AR",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 2083,
				"parties": [
					"Constitutional"
				]
			},
			"Cobb, David": {
				"id": "2004_AR",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 1488,
				"parties": [
					"Green Party Of Arkansas"
				]
			}
		},
		"2004_CA": {
			"Kerry, John F.": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "CA",
				"state": "California",
				"votes": 6745485,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "CA",
				"state": "California",
				"votes": 5509826,
				"parties": [
					"Republican"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "CA",
				"state": "California",
				"votes": 50165,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "CA",
				"state": "California",
				"votes": 40771,
				"parties": [
					"Green"
				]
			},
			"Peltier, Leonard": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Peltier, Leonard",
				"abbr": "CA",
				"state": "California",
				"votes": 27607,
				"parties": [
					"Peace And Freedom"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "CA",
				"state": "California",
				"votes": 26645,
				"parties": [
					"American Independent"
				]
			},
			"Nader, Ralph": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "CA",
				"state": "California",
				"votes": 21213,
				"parties": [
					"Write-In"
				]
			},
			"Jabin, Anthony": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Jabin, Anthony",
				"abbr": "CA",
				"state": "California",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "CA",
				"state": "California",
				"votes": 82,
				"parties": [
					"Write-In"
				]
			},
			"Alexander-Pace, James": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Alexander-Pace, James",
				"abbr": "CA",
				"state": "California",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Parker, John": {
				"id": "2004_CA",
				"year": 2004,
				"name": "Parker, John",
				"abbr": "CA",
				"state": "California",
				"votes": 49,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_CO": {
			"Bush, George W.": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1101255,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1001732,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 12718,
				"parties": [
					"Colorado Reform Party"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 7664,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 2562,
				"parties": [
					"American Constitution Party"
				]
			},
			"Cobb, David": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1591,
				"parties": [
					"Green"
				]
			},
			"Andress, Stanford E. (Andy)": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Andress, Stanford E. (Andy)",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 804,
				"parties": [
					"Unaffiliated"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 700,
				"parties": [
					"Write-In"
				]
			},
			"Amondson, Gene": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Amondson, Gene",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 378,
				"parties": [
					"Concerns Of People Party"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 329,
				"parties": [
					"Socialist Equality Party"
				]
			},
			"Harris, James E.": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Harris, James E.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 241,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Brown, Walter F.": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Brown, Walter F.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 216,
				"parties": [
					"Socialist Party USA"
				]
			},
			"Dodge, Earl F.": {
				"id": "2004_CO",
				"year": 2004,
				"name": "Dodge, Earl F.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 140,
				"parties": [
					"Prohibition Party"
				]
			}
		},
		"2004_CT": {
			"Kerry, John F.": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 857488,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 693826,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 12969,
				"parties": [
					"Politicos Son Corruptos"
				]
			},
			"Cobb, David": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 9564,
				"parties": [
					"Green"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 3367,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 1543,
				"parties": [
					"Concerned Citizens"
				]
			},
			"Calero, Róger": {
				"id": "2004_CT",
				"year": 2004,
				"name": "Calero, Róger",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_DE": {
			"Kerry, John F.": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 200152,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 171660,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 2153,
				"parties": [
					"Independent Party Of Delaware"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 586,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 289,
				"parties": [
					"Constitution"
				]
			},
			"Cobb, David": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 250,
				"parties": [
					"Green"
				]
			},
			"Brown, Walter F.": {
				"id": "2004_DE",
				"year": 2004,
				"name": "Brown, Walter F.",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 100,
				"parties": [
					"Natural Law"
				]
			}
		},
		"2004_DC": {
			"Kerry, John F.": {
				"id": "2004_DC",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 202970,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_DC",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 21256,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_DC",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 1485,
				"parties": [
					"Independent"
				]
			},
			"Cobb, David": {
				"id": "2004_DC",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 737,
				"parties": [
					"D.C. Statehood Green"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_DC",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 502,
				"parties": [
					"Libertarian"
				]
			},
			"Harris, James": {
				"id": "2004_DC",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 130,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2004_FL": {
			"Bush, George W.": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3964522,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3583544,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "FL",
				"state": "Florida",
				"votes": 32971,
				"parties": [
					"Reform"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "FL",
				"state": "Florida",
				"votes": 11996,
				"parties": [
					"Libertarian Party Of Florida"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "FL",
				"state": "Florida",
				"votes": 6626,
				"parties": [
					"Constitution Party Of Florida"
				]
			},
			"Cobb, David": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3917,
				"parties": [
					"Green Party Of Florida"
				]
			},
			"Brown, Walter F.": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Brown, Walter F.",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3502,
				"parties": [
					"Socialist Party Of Florida"
				]
			},
			"Harris, James": {
				"id": "2004_FL",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "FL",
				"state": "Florida",
				"votes": 2732,
				"parties": [
					"Florida Socialist Workers"
				]
			}
		},
		"2004_GA": {
			"Bush, George W.": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1914254,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1366149,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 18387,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 2231,
				"parties": [
					"Write-In"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 580,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 228,
				"parties": [
					"Write-In"
				]
			},
			"Tancredo, Tom": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Tancredo, Tom",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 26,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John J.": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Kennedy, John J.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Byrne, David": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Byrne, David",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Pace, James": {
				"id": "2004_GA",
				"year": 2004,
				"name": "Pace, James",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_HI": {
			"Kerry, John F.": {
				"id": "2004_HI",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 231708,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_HI",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 194191,
				"parties": [
					"Republican"
				]
			},
			"Cobb, David": {
				"id": "2004_HI",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 1737,
				"parties": [
					"Green"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_HI",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 1377,
				"parties": [
					"Libertarian"
				]
			}
		},
		"2004_ID": {
			"Bush, George W.": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 409235,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 181098,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 3844,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 3084,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 1115,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 58,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Merepeace-msmere, Reverend": {
				"id": "2004_ID",
				"year": 2004,
				"name": "Merepeace-msmere, Reverend",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_IL": {
			"Kerry, John F.": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2891550,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2345946,
				"parties": [
					"Republican"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 32442,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3571,
				"parties": [
					"Write-In"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 440,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 241,
				"parties": [
					"Write-In"
				]
			},
			"Camejo, Peter M.": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Camejo, Peter M.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 115,
				"parties": [
					"Write-In"
				]
			},
			"Virag, Ernest": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Virag, Ernest",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Bone, Lawson": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Bone, Lawson",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Cook, David": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Cook, David",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Trowe, Margaret": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Trowe, Margaret",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Kennedy, John",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Christensen, Robert M.": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Christensen, Robert M.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Breivogel, Joann": {
				"id": "2004_IL",
				"year": 2004,
				"name": "Breivogel, Joann",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_IN": {
			"Bush, George Walker": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Bush, George Walker",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1479438,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 969011,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 18058,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1328,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 102,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 37,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 22,
				"parties": [
					"Write-In"
				]
			},
			"Bone, Lawson Mitchell": {
				"id": "2004_IN",
				"year": 2004,
				"name": "Bone, Lawson Mitchell",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_IA": {
			"Bush, George W.": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 751957,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 741898,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 5973,
				"parties": [
					"Nominated By Petition"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 2992,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 1304,
				"parties": [
					"Constitution"
				]
			},
			"Cobb, David": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 1141,
				"parties": [
					"Iowa Green Party"
				]
			},
			"Harris, James": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 373,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_IA",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 176,
				"parties": [
					"Nominated By Petition"
				]
			}
		},
		"2004_KS": {
			"Bush, George W.": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 736456,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 434993,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 9348,
				"parties": [
					"Reform"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 4013,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 2899,
				"parties": [
					"Independent"
				]
			},
			"Cobb, David": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 33,
				"parties": [
					"Write-In"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_KS",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_KY": {
			"Bush, George W.": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1069439,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 712733,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 8856,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 2619,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 2213,
				"parties": [
					"Constitution"
				]
			},
			"Brown, Walt": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 13,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_KY",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_LA": {
			"Bush, George W.": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1102169,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 820299,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 7032,
				"parties": [
					"The Better Life"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 5203,
				"parties": [
					"Constitution"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 2781,
				"parties": [
					"Libertarian"
				]
			},
			"Brown, Walter F.": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Brown, Walter F.",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1795,
				"parties": [
					"Protect Working Families"
				]
			},
			"Amondson, Gene": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Amondson, Gene",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1566,
				"parties": [
					"Prohibition Party"
				]
			},
			"Cobb, David": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1276,
				"parties": [
					"Louisiana Green Party"
				]
			},
			"Harris, James": {
				"id": "2004_LA",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 985,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2004_ME": {
			"Kerry, John F.": {
				"id": "2004_ME",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "ME",
				"state": "Maine",
				"votes": 396842,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_ME",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "ME",
				"state": "Maine",
				"votes": 330201,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_ME",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "ME",
				"state": "Maine",
				"votes": 8069,
				"parties": [
					"The Better Life"
				]
			},
			"Cobb, David": {
				"id": "2004_ME",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "ME",
				"state": "Maine",
				"votes": 2936,
				"parties": [
					"Green Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_ME",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "ME",
				"state": "Maine",
				"votes": 1965,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael": {
				"id": "2004_ME",
				"year": 2004,
				"name": "Peroutka, Michael",
				"abbr": "ME",
				"state": "Maine",
				"votes": 735,
				"parties": [
					"Constitution"
				]
			}
		},
		"2004_MD": {
			"Kerry, John F.": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1334493,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1024703,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 11854,
				"parties": [
					"Populist"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 6094,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 3632,
				"parties": [
					"Green"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 3421,
				"parties": [
					"Constitution"
				]
			},
			"Schriner, Joe": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Schriner, Joe",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 27,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Theodis (Ted), Sr.": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Brown, Theodis (Ted), Sr.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Bone, Lawson Mitchell": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Bone, Lawson Mitchell",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Boyle, Robert Abraham, II": {
				"id": "2004_MD",
				"year": 2004,
				"name": "Boyle, Robert Abraham, II",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_MA": {
			"Kerry, John F.": {
				"id": "2004_MA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 1803800,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_MA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 1071109,
				"parties": [
					"Republican"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 15022,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_MA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 10623,
				"parties": [
					"Green-Rainbow"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 4806,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_MI": {
			"Kerry, John F.": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 2479183,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 2313746,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 24035,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 10552,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 5325,
				"parties": [
					"Green"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 4980,
				"parties": [
					"U.S. Taxpayers"
				]
			},
			"Brown, Walter": {
				"id": "2004_MI",
				"year": 2004,
				"name": "Brown, Walter",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 1431,
				"parties": [
					"Natural Law"
				]
			}
		},
		"2004_MN": {
			"Kerry, John F.": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1445014,
				"parties": [
					"Democratic-Farmer Labor"
				]
			},
			"Bush, George W.": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1346695,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 18683,
				"parties": [
					"The Better Life"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 4639,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 4408,
				"parties": [
					"Green"
				]
			},
			"Peroutka, Michael": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Peroutka, Michael",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 3074,
				"parties": [
					"Constitution"
				]
			},
			"Harens, Thomas J.": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Harens, Thomas J.",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 2387,
				"parties": [
					"Christian Freedom"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 539,
				"parties": [
					"Socialist Equality Party"
				]
			},
			"Calero, Róger": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Calero, Róger",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 416,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Wishnatsky, Martin": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Wishnatsky, Martin",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Renderos, Debra Joyce": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Renderos, Debra Joyce",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Graham-Pendergast, Joy Elaina": {
				"id": "2004_MN",
				"year": 2004,
				"name": "Graham-Pendergast, Joy Elaina",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_MS": {
			"Bush, George W.": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 684981,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 458094,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 3177,
				"parties": [
					"Reform"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1793,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1759,
				"parties": [
					"Constitution"
				]
			},
			"Harris, James": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1268,
				"parties": [
					"Independent"
				]
			},
			"Cobb, David": {
				"id": "2004_MS",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1073,
				"parties": [
					"Green"
				]
			}
		},
		"2004_MO": {
			"Bush, George W.": {
				"id": "2004_MO",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1455713,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_MO",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1259171,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MO",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 9831,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_MO",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 5355,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MO",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1294,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_MT": {
			"Bush, George W.": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "MT",
				"state": "Montana",
				"votes": 266063,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Kerry, John",
				"abbr": "MT",
				"state": "Montana",
				"votes": 173710,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "MT",
				"state": "Montana",
				"votes": 6168,
				"parties": [
					"Independent"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "MT",
				"state": "Montana",
				"votes": 1764,
				"parties": [
					"Constitution"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "MT",
				"state": "Montana",
				"votes": 1733,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "MT",
				"state": "Montana",
				"votes": 996,
				"parties": [
					"Green"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "MT",
				"state": "Montana",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Beattie, Robert Leslie": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Beattie, Robert Leslie",
				"abbr": "MT",
				"state": "Montana",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walter Frederick": {
				"id": "2004_MT",
				"year": 2004,
				"name": "Brown, Walter Frederick",
				"abbr": "MT",
				"state": "Montana",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_NE": {
			"Bush, George W.": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 512814,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 254328,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 5698,
				"parties": [
					"By Petition"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 2041,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 1314,
				"parties": [
					"Nebraska Party"
				]
			},
			"Cobb, David": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 978,
				"parties": [
					"Green"
				]
			},
			"Calero, Róger": {
				"id": "2004_NE",
				"year": 2004,
				"name": "Calero, Róger",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 82,
				"parties": [
					"By Petition"
				]
			}
		},
		"2004_NV": {
			"Bush, George W.": {
				"id": "2004_NV",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 418690,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_NV",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 397190,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NV",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 4838,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NV",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 3176,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_NV",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 1152,
				"parties": [
					"Independent American"
				]
			},
			"Cobb, David": {
				"id": "2004_NV",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 853,
				"parties": [
					"Green"
				]
			}
		},
		"2004_NH": {
			"Kerry, John F.": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 340511,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 331237,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 4479,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 372,
				"parties": [
					"Write-In"
				]
			},
			"McCain, John": {
				"id": "2004_NH",
				"year": 2004,
				"name": "McCain, John",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 357,
				"parties": [
					"Write-In"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 161,
				"parties": [
					"Write-In"
				]
			},
			"Dean, Howard": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Dean, Howard",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 42,
				"parties": [
					"Write-In"
				]
			},
			"Clark, Wesley": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Clark, Wesley",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Powell, Wesley": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Powell, Wesley",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Kucinich, Dennis": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Kucinich, Dennis",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Edwards, John": {
				"id": "2004_NH",
				"year": 2004,
				"name": "Edwards, John",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_NJ": {
			"Kerry, John F.": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1911430,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1670003,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 19418,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 4514,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 2750,
				"parties": [
					"Constitution"
				]
			},
			"Cobb, David": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1807,
				"parties": [
					"Green"
				]
			},
			"Brown, Walter": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Brown, Walter",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 664,
				"parties": [
					"Socialist Party USA"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 575,
				"parties": [
					"Socialist Equality Party"
				]
			},
			"Calero, Róger": {
				"id": "2004_NJ",
				"year": 2004,
				"name": "Calero, Róger",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 530,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2004_NM": {
			"Bush, George W.": {
				"id": "2004_NM",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 376930,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_NM",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 370942,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NM",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 4053,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NM",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 2382,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_NM",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 1226,
				"parties": [
					"Green"
				]
			},
			"Peroutka, Michael": {
				"id": "2004_NM",
				"year": 2004,
				"name": "Peroutka, Michael",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 771,
				"parties": [
					"Constitution"
				]
			}
		},
		"2004_NY": {
			"Kerry, John F.": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NY",
				"state": "New York",
				"votes": 4314280,
				"parties": [
					"Democratic",
					"Working Families"
				]
			},
			"Bush, George W.": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NY",
				"state": "New York",
				"votes": 2962567,
				"parties": [
					"Republican",
					"Conservative"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NY",
				"state": "New York",
				"votes": 99873,
				"parties": [
					"Independence",
					"Peace And Justice"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NY",
				"state": "New York",
				"votes": 11607,
				"parties": [
					"Libertarian"
				]
			},
			"Calero, Róger": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Calero, Róger",
				"abbr": "NY",
				"state": "New York",
				"votes": 2405,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "NY",
				"state": "New York",
				"votes": 207,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "NY",
				"state": "New York",
				"votes": 87,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "NY",
				"state": "New York",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Halpin, Michael": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Halpin, Michael",
				"abbr": "NY",
				"state": "New York",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_NY",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "NY",
				"state": "New York",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_NC": {
			"Bush, George W.": {
				"id": "2004_NC",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 1961166,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_NC",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 1525849,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_NC",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 11731,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2004_NC",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 1805,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_NC",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 348,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_NC",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 108,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_ND": {
			"Bush, George W.": {
				"id": "2004_ND",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 196651,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_ND",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 111052,
				"parties": [
					"Democratic-Nonpartisan League"
				]
			},
			"Nader, Ralph": {
				"id": "2004_ND",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 3756,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_ND",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 851,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_ND",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 514,
				"parties": [
					"Constitution"
				]
			},
			"Wishnatsky, Martin": {
				"id": "2004_ND",
				"year": 2004,
				"name": "Wishnatsky, Martin",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_OH": {
			"Bush, George W.": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2859768,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2741167,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 14676,
				"parties": [
					"Nonpartisan"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 11939,
				"parties": [
					"Nonpartisan"
				]
			},
			"Cobb, David Keith": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Cobb, David Keith",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 192,
				"parties": [
					"Write-In"
				]
			},
			"Schriner, Joe": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Schriner, Joe",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 114,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 22,
				"parties": [
					"Write-In"
				]
			},
			"Duncan, Richard A.": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Duncan, Richard A.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 17,
				"parties": [
					"Write-In"
				]
			},
			"Zych, Thomas F.": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Zych, Thomas F.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 11,
				"parties": [
					"Write-In"
				]
			},
			"Parker, John T.": {
				"id": "2004_OH",
				"year": 2004,
				"name": "Parker, John T.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_OK": {
			"Bush, George W.": {
				"id": "2004_OK",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "OK",
				"state": "Oklahoma",
				"votes": 959792,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_OK",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "OK",
				"state": "Oklahoma",
				"votes": 503966,
				"parties": [
					"Democratic"
				]
			}
		},
		"2004_OR": {
			"Kerry, John F.": {
				"id": "2004_OR",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 943163,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_OR",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 866831,
				"parties": [
					"Republican"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_OR",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 7260,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_OR",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 5315,
				"parties": [
					"Pacific Green"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_OR",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 5257,
				"parties": [
					"Constitution"
				]
			}
		},
		"2004_PA": {
			"Kerry, John F.": {
				"id": "2004_PA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 2938095,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_PA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 2793847,
				"parties": [
					"Republican"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_PA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 21185,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David K.": {
				"id": "2004_PA",
				"year": 2004,
				"name": "Cobb, David K.",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 6319,
				"parties": [
					"Green"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_PA",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 6318,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2004_PA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 2656,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_RI": {
			"Kerry, John F.": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 259765,
				"parties": [
					"Democratic",
					"Write-In"
				]
			},
			"Bush, George W.": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 169046,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 4661,
				"parties": [
					"Reform",
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 1333,
				"parties": [
					"Green"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 907,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 339,
				"parties": [
					"Constitution"
				]
			},
			"McCain, John": {
				"id": "2004_RI",
				"year": 2004,
				"name": "McCain, John",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 284,
				"parties": [
					"Write-In"
				]
			},
			"Parker, John": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Parker, John",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 253,
				"parties": []
			},
			"Powell, Colin": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Powell, Colin",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 35,
				"parties": [
					"Write-In"
				]
			},
			"Chafee, Lincoln": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Chafee, Lincoln",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Dean, Howard": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Dean, Howard",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Buchanan, Patrick": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Buchanan, Patrick",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 10,
				"parties": [
					"Write-In"
				]
			},
			"Bush, George, Sr.": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Bush, George, Sr.",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			},
			"Guilliani, Rudy": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Guilliani, Rudy",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			},
			"Clinton, Hillary": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Clinton, Hillary",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Kucinich, Dennis J.": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Kucinich, Dennis J.",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Clinton, Bill": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Clinton, Bill",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Lieberman, Joseph": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Lieberman, Joseph",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Mouse, Mickey": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Mouse, Mickey",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Shilling, Curt": {
				"id": "2004_RI",
				"year": 2004,
				"name": "Shilling, Curt",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"None of the Above": {
				"id": "2004_RI",
				"year": 2004,
				"name": "None of the Above",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_SC": {
			"Bush, George W.": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 937974,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 661699,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 5520,
				"parties": [
					"Independence"
				]
			},
			"Peroutka, Michael": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Peroutka, Michael",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 5317,
				"parties": [
					"Constitution"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 3608,
				"parties": [
					"Libertarian"
				]
			},
			"Brown, Walter F. \"Walt\"": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Brown, Walter F. \"Walt\"",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 2124,
				"parties": [
					"United Citizens"
				]
			},
			"Cobb, David": {
				"id": "2004_SC",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 1488,
				"parties": [
					"Green"
				]
			}
		},
		"2004_SD": {
			"Bush, George W.": {
				"id": "2004_SD",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 232584,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_SD",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 149244,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_SD",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 4320,
				"parties": [
					"Independent"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_SD",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 1103,
				"parties": [
					"Constitution"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_SD",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 964,
				"parties": [
					"Libertarian"
				]
			}
		},
		"2004_TN": {
			"Bush, George W.": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1384375,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1036477,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 8992,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 4866,
				"parties": [
					"Independent"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 2570,
				"parties": [
					"Independent"
				]
			},
			"Cobb, David": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 33,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_TN",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_TX": {
			"Bush, George W.": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "TX",
				"state": "Texas",
				"votes": 4526917,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "TX",
				"state": "Texas",
				"votes": 2832704,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "TX",
				"state": "Texas",
				"votes": 38787,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "TX",
				"state": "Texas",
				"votes": 9159,
				"parties": [
					"Write-In"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "TX",
				"state": "Texas",
				"votes": 1636,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David Keith": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Cobb, David Keith",
				"abbr": "TX",
				"state": "Texas",
				"votes": 1014,
				"parties": [
					"Write-In"
				]
			},
			"Falk, Andrew J.": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Falk, Andrew J.",
				"abbr": "TX",
				"state": "Texas",
				"votes": 219,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "TX",
				"state": "Texas",
				"votes": 126,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walt": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Brown, Walt",
				"abbr": "TX",
				"state": "Texas",
				"votes": 111,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Deborah Elaine": {
				"id": "2004_TX",
				"year": 2004,
				"name": "Allen, Deborah Elaine",
				"abbr": "TX",
				"state": "Texas",
				"votes": 92,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_UT": {
			"Bush, George W.": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "UT",
				"state": "Utah",
				"votes": 663742,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "UT",
				"state": "Utah",
				"votes": 241199,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "UT",
				"state": "Utah",
				"votes": 11305,
				"parties": [
					"Unaffiliated"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "UT",
				"state": "Utah",
				"votes": 6841,
				"parties": [
					"Constitution"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "UT",
				"state": "Utah",
				"votes": 3375,
				"parties": [
					"Libertarian"
				]
			},
			"Jay, Charles": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Jay, Charles",
				"abbr": "UT",
				"state": "Utah",
				"votes": 946,
				"parties": [
					"Personal Choice"
				]
			},
			"Harris, James": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "UT",
				"state": "Utah",
				"votes": 393,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Cobb, David": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "UT",
				"state": "Utah",
				"votes": 39,
				"parties": [
					"Write-In"
				]
			},
			"Topham, Lawrence Rey": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Topham, Lawrence Rey",
				"abbr": "UT",
				"state": "Utah",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Schriner, Joe": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Schriner, Joe",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John Joseph": {
				"id": "2004_UT",
				"year": 2004,
				"name": "Kennedy, John Joseph",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_VT": {
			"Kerry, John F.": {
				"id": "2004_VT",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 184067,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_VT",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 121180,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_VT",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 4494,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_VT",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 1102,
				"parties": [
					"Libertarian"
				]
			},
			"Parker, John Thompson": {
				"id": "2004_VT",
				"year": 2004,
				"name": "Parker, John Thompson",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 265,
				"parties": [
					"Liberty Union"
				]
			},
			"Calero, Róger": {
				"id": "2004_VT",
				"year": 2004,
				"name": "Calero, Róger",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 244,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2004_VA": {
			"Bush, George W.": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1716959,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1454742,
				"parties": [
					"Democratic"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 11032,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 10161,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 2393,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 104,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Walter F.": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Brown, Walter F.",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 23,
				"parties": [
					"Write-In"
				]
			},
			"Spence, Joseph": {
				"id": "2004_VA",
				"year": 2004,
				"name": "Spence, Joseph",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_WA": {
			"Kerry, John": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Kerry, John",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1510201,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Bush, George",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1304894,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "WA",
				"state": "Washington",
				"votes": 23283,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "WA",
				"state": "Washington",
				"votes": 11955,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael Anthony": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Peroutka, Michael Anthony",
				"abbr": "WA",
				"state": "Washington",
				"votes": 3922,
				"parties": [
					"Constitution"
				]
			},
			"Cobb, David": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "WA",
				"state": "Washington",
				"votes": 2974,
				"parties": [
					"Green"
				]
			},
			"Parker, John": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Parker, John",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1077,
				"parties": []
			},
			"Harris, James": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "WA",
				"state": "Washington",
				"votes": 547,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Van Auken, Bill": {
				"id": "2004_WA",
				"year": 2004,
				"name": "Van Auken, Bill",
				"abbr": "WA",
				"state": "Washington",
				"votes": 231,
				"parties": [
					"Socialist Equality Party"
				]
			}
		},
		"2004_WV": {
			"Bush, George W.": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 423778,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 326541,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 4063,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 1405,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Peroutka, Michael",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 82,
				"parties": [
					"Write-In"
				]
			},
			"Kennedy, John": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Kennedy, John",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 13,
				"parties": [
					"Write-In"
				]
			},
			"Cobb, David": {
				"id": "2004_WV",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			}
		},
		"2004_WI": {
			"Kerry, John F.": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 1489504,
				"parties": [
					"Democratic"
				]
			},
			"Bush, George W.": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 1478120,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 16390,
				"parties": [
					"The Better Life"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 6464,
				"parties": [
					"Libertarian"
				]
			},
			"Cobb, David": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Cobb, David",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 2661,
				"parties": [
					"Wisconsin Greens"
				]
			},
			"Brown, Walter F.": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Brown, Walter F.",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 471,
				"parties": [
					"Socialist Party Of Wisconsin"
				]
			},
			"Harris, James": {
				"id": "2004_WI",
				"year": 2004,
				"name": "Harris, James",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 411,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2004_WY": {
			"Bush, George W.": {
				"id": "2004_WY",
				"year": 2004,
				"name": "Bush, George W.",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 167629,
				"parties": [
					"Republican"
				]
			},
			"Kerry, John F.": {
				"id": "2004_WY",
				"year": 2004,
				"name": "Kerry, John F.",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 70776,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2004_WY",
				"year": 2004,
				"name": "Nader, Ralph",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 2741,
				"parties": [
					"Independent"
				]
			},
			"Badnarik, Michael": {
				"id": "2004_WY",
				"year": 2004,
				"name": "Badnarik, Michael",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 1171,
				"parties": [
					"Libertarian"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2004_WY",
				"year": 2004,
				"name": "Peroutka, Michael A.",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 631,
				"parties": [
					"Independent"
				]
			}
		}
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = {
		"2008_AL": {
			"McCain, John": {
				"id": "2008_AL",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 1266546,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_AL",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 813479,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_AL",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 6788,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_AL",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 4991,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_AL",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 4310,
				"parties": [
					"Independent"
				]
			}
		},
		"2008_AK": {
			"McCain, John": {
				"id": "2008_AK",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 193841,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_AK",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 123594,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_AK",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 3783,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_AK",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 1660,
				"parties": [
					"Alaskan Independence"
				]
			},
			"Barr, Bob": {
				"id": "2008_AK",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 1589,
				"parties": [
					"Libertarian"
				]
			}
		},
		"2008_AZ": {
			"McCain, John": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 1230111,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 1034707,
				"parties": [
					"Democratic"
				]
			},
			"Barr, Bob": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 12555,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 11301,
				"parties": [
					"Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 3406,
				"parties": [
					"Green"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 1371,
				"parties": [
					"Write-In"
				]
			},
			"Jay, Charles": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "Jay, Charles",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 16,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_AZ",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_AR": {
			"McCain, John": {
				"id": "2008_AR",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 638017,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_AR",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 422310,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_AR",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 12882,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_AR",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 4776,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_AR",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 4023,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_AR",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 3470,
				"parties": [
					"Green"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_AR",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 1139,
				"parties": [
					"Socialism and Liberation Party"
				]
			}
		},
		"2008_CA": {
			"Obama, Barack": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "CA",
				"state": "California",
				"votes": 8274473,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_CA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "CA",
				"state": "California",
				"votes": 5011781,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "CA",
				"state": "California",
				"votes": 108381,
				"parties": [
					"Peace And Freedom"
				]
			},
			"Barr, Bob": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "CA",
				"state": "California",
				"votes": 67582,
				"parties": [
					"Libertarian"
				]
			},
			"Keyes, Alan": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "CA",
				"state": "California",
				"votes": 40673,
				"parties": [
					"American Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_CA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "CA",
				"state": "California",
				"votes": 38774,
				"parties": [
					"Green"
				]
			},
			"Paul, Ron": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Paul, Ron",
				"abbr": "CA",
				"state": "California",
				"votes": 17006,
				"parties": [
					"Write-In"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "CA",
				"state": "California",
				"votes": 3145,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Harris, James",
				"abbr": "CA",
				"state": "California",
				"votes": 49,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank": {
				"id": "2008_CA",
				"year": 2008,
				"name": "Moore, Frank",
				"abbr": "CA",
				"state": "California",
				"votes": 36,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_CO": {
			"Obama, Barack": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1288633,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_CO",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1073629,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 13352,
				"parties": [
					"Unaffiliated"
				]
			},
			"Barr, Bob": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 10898,
				"parties": [
					"Libertarian Party of Colorado"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 6233,
				"parties": [
					"Constitution"
				]
			},
			"Keyes, Alan": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 3051,
				"parties": [
					"America’s Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_CO",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 2822,
				"parties": [
					"Green Party of Colorado"
				]
			},
			"McEnulty, Frank Edward": {
				"id": "2008_CO",
				"year": 2008,
				"name": "McEnulty, Frank Edward",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 829,
				"parties": [
					"Unaffiliated"
				]
			},
			"Jay, Charles": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Jay, Charles",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 598,
				"parties": [
					"Boston Tea Party"
				]
			},
			"Allen, Jonathan E.": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Allen, Jonathan E.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 348,
				"parties": [
					"HeartQuake ‘08"
				]
			},
			"Stevens, Thomas Robert": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Stevens, Thomas Robert",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 336,
				"parties": [
					"Objectivist Party"
				]
			},
			"Moore, Brian": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 226,
				"parties": [
					"Socialist Party USA"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_CO",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 158,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Harris, James": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Harris, James",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 154,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Lyttle, Bradford": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Lyttle, Bradford",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 110,
				"parties": [
					"U.S. Pacificist Party"
				]
			},
			"Amondson, Gene C.": {
				"id": "2008_CO",
				"year": 2008,
				"name": "Amondson, Gene C.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 85,
				"parties": [
					"Prohibition Party"
				]
			}
		},
		"2008_CT": {
			"Obama, Barack": {
				"id": "2008_CT",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 997772,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_CT",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 629428,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_CT",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 19162,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_CT",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 311,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_CT",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 90,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_CT",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 19,
				"parties": [
					"Write-In"
				]
			},
			"Calero, Roger": {
				"id": "2008_CT",
				"year": 2008,
				"name": "Calero, Roger",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 15,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_DE": {
			"Obama, Barack": {
				"id": "2008_DE",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 255459,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_DE",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 152374,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_DE",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 2401,
				"parties": [
					"Independent Party of Delaware"
				]
			},
			"Barr, Bob": {
				"id": "2008_DE",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 1109,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_DE",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 626,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia A.": {
				"id": "2008_DE",
				"year": 2008,
				"name": "McKinney, Cynthia A.",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 385,
				"parties": [
					"Green"
				]
			},
			"Calero, Roger": {
				"id": "2008_DE",
				"year": 2008,
				"name": "Calero, Roger",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 58,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2008_DC": {
			"Obama, Barack": {
				"id": "2008_DC",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 245800,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_DC",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 17367,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_DC",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 958,
				"parties": [
					"Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_DC",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 590,
				"parties": [
					"D.C. Statehood Green"
				]
			}
		},
		"2008_FL": {
			"Obama, Barack": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "FL",
				"state": "Florida",
				"votes": 4282074,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_FL",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "FL",
				"state": "Florida",
				"votes": 4045624,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "FL",
				"state": "Florida",
				"votes": 28124,
				"parties": [
					"Ecology Party of Florida"
				]
			},
			"Barr, Bob": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "FL",
				"state": "Florida",
				"votes": 17218,
				"parties": [
					"Libertarian Party of Florida"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "FL",
				"state": "Florida",
				"votes": 7915,
				"parties": [
					"Constitution Party of Florida"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_FL",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "FL",
				"state": "Florida",
				"votes": 2887,
				"parties": [
					"Green Party of Florida"
				]
			},
			"Keyes, Alan": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "FL",
				"state": "Florida",
				"votes": 2550,
				"parties": [
					"America’s Independent Party of Florida"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_FL",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "FL",
				"state": "Florida",
				"votes": 1516,
				"parties": [
					"Party for Socialism and Liberation-Florida"
				]
			},
			"Jay, Charles": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Jay, Charles",
				"abbr": "FL",
				"state": "Florida",
				"votes": 795,
				"parties": [
					"Boston Tea Party"
				]
			},
			"Harris, James": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Harris, James",
				"abbr": "FL",
				"state": "Florida",
				"votes": 533,
				"parties": [
					"Florida Socialist Workers"
				]
			},
			"Stevens, Thomas Robert": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Stevens, Thomas Robert",
				"abbr": "FL",
				"state": "Florida",
				"votes": 419,
				"parties": [
					"Objectivist Party of Florida"
				]
			},
			"Moore, Brian": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "FL",
				"state": "Florida",
				"votes": 405,
				"parties": [
					"Socialist Party of Florida"
				]
			},
			"Nettles, Gary": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Nettles, Gary",
				"abbr": "FL",
				"state": "Florida",
				"votes": 391,
				"parties": [
					"Write-In"
				]
			},
			"Amondson, Gene": {
				"id": "2008_FL",
				"year": 2008,
				"name": "Amondson, Gene",
				"abbr": "FL",
				"state": "Florida",
				"votes": 293,
				"parties": [
					"Prohibition Party"
				]
			}
		},
		"2008_GA": {
			"McCain, John": {
				"id": "2008_GA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 2048759,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1844123,
				"parties": [
					"Democratic"
				]
			},
			"Barr, Bob": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 28731,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1402,
				"parties": [
					"Write-In"
				]
			},
			"Nader, Ralph": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1158,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_GA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 250,
				"parties": [
					"Write-In"
				]
			},
			"Peroutka, Michael A.": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Peroutka, Michael A.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 23,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Harris, James",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 20,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Moore, Frank",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Byrne, David C.": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Byrne, David C.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Brian Russell": {
				"id": "2008_GA",
				"year": 2008,
				"name": "Brown, Brian Russell",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_HI": {
			"Obama, Barack": {
				"id": "2008_HI",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 325871,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_HI",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 120566,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_HI",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 3825,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_HI",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 1314,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_HI",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 1013,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_HI",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 979,
				"parties": [
					"Green"
				]
			}
		},
		"2008_ID": {
			"McCain, John": {
				"id": "2008_ID",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 403012,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 236440,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 7175,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 4747,
				"parties": [
					"Constitution"
				]
			},
			"Barr, Bob": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 3658,
				"parties": [
					"Libertarian"
				]
			},
			"Keyes, Alan": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 40,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_ID",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 39,
				"parties": [
					"Write-In"
				]
			},
			"Claus, Santa": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Claus, Santa",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Bone, Lawson Mitchell": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Bone, Lawson Mitchell",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Reverend MerePeace-MsMere": {
				"id": "2008_ID",
				"year": 2008,
				"name": "Reverend MerePeace-MsMere",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_IL": {
			"Obama, Barack": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3419348,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_IL",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2031179,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 30948,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 19642,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_IL",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 11838,
				"parties": [
					"Green"
				]
			},
			"Baldwin, Charles O.": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Baldwin, Charles O.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 8256,
				"parties": [
					"Constitution Party of Illinois"
				]
			},
			"Polachek, John Joseph": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Polachek, John Joseph",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1149,
				"parties": [
					"New"
				]
			},
			"Hobbs, Ronald G.": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Hobbs, Ronald G.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Donald K.": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Allen, Donald K.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank James": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Moore, Frank James",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Paul, Ron": {
				"id": "2008_IL",
				"year": 2008,
				"name": "Paul, Ron",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_IN": {
			"Obama, Barack": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1374039,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_IN",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1345648,
				"parties": [
					"Republican"
				]
			},
			"Barr, Bob": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 29257,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1024,
				"parties": [
					"Write-In"
				]
			},
			"Nader, Ralph": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 909,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_IN",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 87,
				"parties": [
					"Write-In"
				]
			},
			"Castle, Darrell L.": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Castle, Darrell L.",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 51,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Faith, Michael L.": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Faith, Michael L.",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Mottus, Kevin": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Mottus, Kevin",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			},
			"Bone, Lawson Mitchell": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Bone, Lawson Mitchell",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Kujawski, \"Lou\"": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Kujawski, \"Lou\"",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Plemons, John Leroy": {
				"id": "2008_IN",
				"year": 2008,
				"name": "Plemons, John Leroy",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_IA": {
			"Obama, Barack": {
				"id": "2008_IA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 828940,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_IA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 682379,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_IA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 8014,
				"parties": [
					"Peace And Freedom"
				]
			},
			"Barr, Bob": {
				"id": "2008_IA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 4590,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_IA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 4445,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_IA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 1423,
				"parties": [
					"Green"
				]
			},
			"Harris, James": {
				"id": "2008_IA",
				"year": 2008,
				"name": "Harris, James",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 292,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Moore, Brian": {
				"id": "2008_IA",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 182,
				"parties": [
					"Socialist Party USA"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_IA",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 121,
				"parties": [
					"Party for Socialism and Liberation"
				]
			}
		},
		"2008_KS": {
			"McCain, John": {
				"id": "2008_KS",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 699655,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 514765,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 10527,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 6706,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 4148,
				"parties": [
					"Reform"
				]
			},
			"McKinney, Cynthia A.": {
				"id": "2008_KS",
				"year": 2008,
				"name": "McKinney, Cynthia A.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 35,
				"parties": [
					"Write-In"
				]
			},
			"Keyes, Alan": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 31,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan E.": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Allen, Jonathan E.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Moore, Frank",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Judd, Keith Russell": {
				"id": "2008_KS",
				"year": 2008,
				"name": "Judd, Keith Russell",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_KY": {
			"McCain, John": {
				"id": "2008_KY",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1048462,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 751985,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 15378,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 5989,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 4694,
				"parties": [
					"Constitution"
				]
			},
			"Habermehl, Leonard C.": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Habermehl, Leonard C.",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 57,
				"parties": [
					"Write-In"
				]
			},
			"Keyes, Alan": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 27,
				"parties": [
					"Write-In"
				]
			},
			"Mills, Billy": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Mills, Billy",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Judd, Keith Russell": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Judd, Keith Russell",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Upchurch, Shelley Renée": {
				"id": "2008_KY",
				"year": 2008,
				"name": "Upchurch, Shelley Renée",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_LA": {
			"McCain, John": {
				"id": "2008_LA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1148275,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_LA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 782989,
				"parties": [
					"Democratic"
				]
			},
			"Paul, \"Ron\"": {
				"id": "2008_LA",
				"year": 2008,
				"name": "Paul, \"Ron\"",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 9368,
				"parties": [
					"Louisiana Taxpayers Party"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_LA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 9187,
				"parties": [
					"Green"
				]
			},
			"Nader, Ralph": {
				"id": "2008_LA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 6997,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_LA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 2581,
				"parties": [
					"Constitution"
				]
			},
			"Harris, James": {
				"id": "2008_LA",
				"year": 2008,
				"name": "Harris, James",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 735,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_LA",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 354,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Amondson, Gene C.": {
				"id": "2008_LA",
				"year": 2008,
				"name": "Amondson, Gene C.",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 275,
				"parties": [
					"Prohibition Party"
				]
			}
		},
		"2008_ME": {
			"Obama, Barack": {
				"id": "2008_ME",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "ME",
				"state": "Maine",
				"votes": 421923,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_ME",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "ME",
				"state": "Maine",
				"votes": 295273,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_ME",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "ME",
				"state": "Maine",
				"votes": 10636,
				"parties": [
					"Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_ME",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "ME",
				"state": "Maine",
				"votes": 2900,
				"parties": [
					"Green Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_ME",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "ME",
				"state": "Maine",
				"votes": 251,
				"parties": [
					"Write-In"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_ME",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "ME",
				"state": "Maine",
				"votes": 177,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_ME",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "ME",
				"state": "Maine",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_MD": {
			"Obama, Barack": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1629467,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_MD",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 959862,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 14713,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 9842,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_MD",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 4747,
				"parties": [
					"Green"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 3760,
				"parties": [
					"Constitution"
				]
			},
			"Keyes, Alan": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 103,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Donald K.": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Allen, Donald K.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 17,
				"parties": [
					"Write-In"
				]
			},
			"Taylor, Blaine": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Taylor, Blaine",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 10,
				"parties": [
					"Write-In"
				]
			},
			"Schriner, Joe": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Schriner, Joe",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Starr, Lynne A.": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Starr, Lynne A.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Heupel, RaeDeen R.": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Heupel, RaeDeen R.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Moore, Frank",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Aparicio, Jose M.": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Aparicio, Jose M.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Theodis (Ted), Sr.": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Brown, Theodis (Ted), Sr.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Hobbs, Ronald G.": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Hobbs, Ronald G.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Jay, Charles": {
				"id": "2008_MD",
				"year": 2008,
				"name": "Jay, Charles",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_MA": {
			"Obama, Barack": {
				"id": "2008_MA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 1904097,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_MA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 1108854,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 28841,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_MA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 13189,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_MA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 6550,
				"parties": [
					"Green-Rainbow"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 4971,
				"parties": [
					"Constitution"
				]
			}
		},
		"2008_MI": {
			"Obama, Barack": {
				"id": "2008_MI",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 2872579,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_MI",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 2048639,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MI",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 33085,
				"parties": [
					"Natural Law Party"
				]
			},
			"Barr, Bob": {
				"id": "2008_MI",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 23716,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MI",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 14685,
				"parties": [
					"U.S. Taxpayers"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_MI",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 8892,
				"parties": [
					"Green"
				]
			},
			"Keyes, Alan": {
				"id": "2008_MI",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 129,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_MI",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 41,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_MN": {
			"Obama, Barack": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1573354,
				"parties": [
					"Democratic-Farmer Labor"
				]
			},
			"McCain, John": {
				"id": "2008_MN",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1275409,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 30152,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 9174,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 6787,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_MN",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 5174,
				"parties": [
					"Green"
				]
			},
			"Calero, Róger": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Calero, Róger",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 790,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Keyes, Alan": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 22,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Schriner, Joe": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Schriner, Joe",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Montgomery, Curtis": {
				"id": "2008_MN",
				"year": 2008,
				"name": "Montgomery, Curtis",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_MS": {
			"McCain, John": {
				"id": "2008_MS",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 724597,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_MS",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 554662,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MS",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 4011,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MS",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 2551,
				"parties": [
					"Constitution"
				]
			},
			"Barr, Bob": {
				"id": "2008_MS",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 2529,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia A.": {
				"id": "2008_MS",
				"year": 2008,
				"name": "McKinney, Cynthia A.",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1034,
				"parties": [
					"Green"
				]
			},
			"Weill, Ted C.": {
				"id": "2008_MS",
				"year": 2008,
				"name": "Weill, Ted C.",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 481,
				"parties": [
					"Reform"
				]
			}
		},
		"2008_MO": {
			"McCain, John": {
				"id": "2008_MO",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1445814,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_MO",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1441911,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MO",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 17813,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_MO",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 11386,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MO",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 8201,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_MO",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 80,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_MT": {
			"McCain, John": {
				"id": "2008_MT",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "MT",
				"state": "Montana",
				"votes": 242763,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "MT",
				"state": "Montana",
				"votes": 231667,
				"parties": [
					"Democratic"
				]
			},
			"Paul, Ron": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Paul, Ron",
				"abbr": "MT",
				"state": "Montana",
				"votes": 10638,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "MT",
				"state": "Montana",
				"votes": 3686,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "MT",
				"state": "Montana",
				"votes": 1355,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "MT",
				"state": "Montana",
				"votes": 143,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia Ann": {
				"id": "2008_MT",
				"year": 2008,
				"name": "McKinney, Cynthia Ann",
				"abbr": "MT",
				"state": "Montana",
				"votes": 23,
				"parties": [
					"Write-In"
				]
			},
			"Heupel, RaeDeen": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Heupel, RaeDeen",
				"abbr": "MT",
				"state": "Montana",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Clemente, Rosa A.": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Clemente, Rosa A.",
				"abbr": "MT",
				"state": "Montana",
				"votes": 10,
				"parties": [
					"Write-In"
				]
			},
			"Claus, Santa": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Claus, Santa",
				"abbr": "MT",
				"state": "Montana",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "MT",
				"state": "Montana",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Wyatt, Amy Lou": {
				"id": "2008_MT",
				"year": 2008,
				"name": "Wyatt, Amy Lou",
				"abbr": "MT",
				"state": "Montana",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_NE": {
			"McCain, John": {
				"id": "2008_NE",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 452979,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_NE",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 333319,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NE",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 5406,
				"parties": [
					"By Petition"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_NE",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 2972,
				"parties": [
					"Nebraska Party"
				]
			},
			"Barr, Bob": {
				"id": "2008_NE",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 2740,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NE",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 1028,
				"parties": [
					"Green"
				]
			}
		},
		"2008_NV": {
			"Obama, Barack": {
				"id": "2008_NV",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 533736,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_NV",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 412827,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NV",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 6150,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_NV",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 4263,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_NV",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 3194,
				"parties": [
					"Independent American  Party"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NV",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 1411,
				"parties": [
					"Green"
				]
			}
		},
		"2008_NH": {
			"Obama, Barack": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 384826,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_NH",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 316534,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 3503,
				"parties": [
					"Independent"
				]
			},
			"Barr, \"Bob\"": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Barr, \"Bob\"",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 2217,
				"parties": [
					"Libertarian"
				]
			},
			"Clinton, Hilary": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Clinton, Hilary",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 1124,
				"parties": [
					"Write-In"
				]
			},
			"Paul, Ron": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Paul, Ron",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 1092,
				"parties": [
					"Write-In"
				]
			},
			"Others,": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Others,",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 673,
				"parties": [
					"Write-In"
				]
			},
			"Phillies, George": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Phillies, George",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 531,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 226,
				"parties": [
					"Write-In"
				]
			},
			"Romney, Mitt": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Romney, Mitt",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 112,
				"parties": [
					"Write-In"
				]
			},
			"Huckabee, Mike": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Huckabee, Mike",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 61,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NH",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 40,
				"parties": [
					"Write-In"
				]
			},
			"Palin, Sarah": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Palin, Sarah",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Clinton, Bill": {
				"id": "2008_NH",
				"year": 2008,
				"name": "Clinton, Bill",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 13,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_NJ": {
			"Obama, Barack": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 2215422,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1613207,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 21298,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 8441,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 3956,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 3636,
				"parties": [
					"Green"
				]
			},
			"Moore, Brian": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 699,
				"parties": [
					"Socialist Party USA"
				]
			},
			"Boss, Jeffrey \"Jeff\"": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Boss, Jeffrey \"Jeff\"",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 639,
				"parties": [
					"Vote Here"
				]
			},
			"Calero, Roger": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "Calero, Roger",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 523,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_NJ",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 416,
				"parties": [
					"Socialism and Liberation Party"
				]
			}
		},
		"2008_NM": {
			"Obama, Barack": {
				"id": "2008_NM",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 472422,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_NM",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 346832,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NM",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 5327,
				"parties": [
					"New Mexico Independent Party"
				]
			},
			"Barr, Bob": {
				"id": "2008_NM",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 2428,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_NM",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 1597,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NM",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 1552,
				"parties": [
					"Green"
				]
			}
		},
		"2008_NY": {
			"Obama, Barack": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NY",
				"state": "New York",
				"votes": 4804945,
				"parties": [
					"Democratic",
					"Working Families"
				]
			},
			"McCain, John": {
				"id": "2008_NY",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NY",
				"state": "New York",
				"votes": 2752771,
				"parties": [
					"Republican",
					"Conservative",
					"Independence"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NY",
				"state": "New York",
				"votes": 41249,
				"parties": [
					"Populist"
				]
			},
			"Barr, Bob": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "NY",
				"state": "New York",
				"votes": 19596,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NY",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NY",
				"state": "New York",
				"votes": 12801,
				"parties": [
					"Green"
				]
			},
			"Calero, Roger": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Calero, Roger",
				"abbr": "NY",
				"state": "New York",
				"votes": 3615,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_NY",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "NY",
				"state": "New York",
				"votes": 1639,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "NY",
				"state": "New York",
				"votes": 634,
				"parties": [
					"Write-In"
				]
			},
			"Keyes, Alan Lee": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Keyes, Alan Lee",
				"abbr": "NY",
				"state": "New York",
				"votes": 35,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerome S.": {
				"id": "2008_NY",
				"year": 2008,
				"name": "White, Jerome S.",
				"abbr": "NY",
				"state": "New York",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "NY",
				"state": "New York",
				"votes": 10,
				"parties": [
					"Write-In"
				]
			},
			"Washington, Lanakila": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Washington, Lanakila",
				"abbr": "NY",
				"state": "New York",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "NY",
				"state": "New York",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Skok, Michael": {
				"id": "2008_NY",
				"year": 2008,
				"name": "Skok, Michael",
				"abbr": "NY",
				"state": "New York",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_NC": {
			"Obama, Barack": {
				"id": "2008_NC",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 2142651,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_NC",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 2128474,
				"parties": [
					"Republican"
				]
			},
			"Barr, Bob": {
				"id": "2008_NC",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 25722,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2008_NC",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 1448,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_NC",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 158,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_NC",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 38,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_ND": {
			"McCain, John": {
				"id": "2008_ND",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 168601,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_ND",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 141278,
				"parties": [
					"Democratic-Nonpartisan League"
				]
			},
			"Nader, Ralph": {
				"id": "2008_ND",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 4189,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_ND",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 1354,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_ND",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 1199,
				"parties": [
					"Constitution"
				]
			}
		},
		"2008_OH": {
			"Obama, Barack": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2940044,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_OH",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2677820,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 42337,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 19917,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 12565,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_OH",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 8518,
				"parties": [
					"Green"
				]
			},
			"Duncan, Richard": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Duncan, Richard",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 3905,
				"parties": [
					"Independent"
				]
			},
			"Moore, Brian": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2735,
				"parties": [
					"Socialist Party USA"
				]
			},
			"Allen, Donald K.": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Allen, Donald K.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 212,
				"parties": [
					"Write-In"
				]
			},
			"Keyes, Alan L.": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Keyes, Alan L.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 160,
				"parties": [
					"Write-In"
				]
			},
			"Schriner, Joe": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Schriner, Joe",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 71,
				"parties": [
					"Write-In"
				]
			},
			"Robertson, Platt": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Robertson, Platt",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 63,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Germalic, James R.": {
				"id": "2008_OH",
				"year": 2008,
				"name": "Germalic, James R.",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_OK": {
			"McCain, John": {
				"id": "2008_OK",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "OK",
				"state": "Oklahoma",
				"votes": 960165,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_OK",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "OK",
				"state": "Oklahoma",
				"votes": 502496,
				"parties": [
					"Democratic"
				]
			}
		},
		"2008_OR": {
			"Obama, Barack": {
				"id": "2008_OR",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 1037291,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_OR",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 738475,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_OR",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 18614,
				"parties": [
					"Peace"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_OR",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 7693,
				"parties": [
					"Constitution"
				]
			},
			"Barr, Bob": {
				"id": "2008_OR",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 7635,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_OR",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 4543,
				"parties": [
					"Pacific Green"
				]
			}
		},
		"2008_PA": {
			"Obama, Barack": {
				"id": "2008_PA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 3276363,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_PA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 2655885,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_PA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 42977,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_PA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 19912,
				"parties": [
					"Libertarian"
				]
			},
			"Clinton, Hillary": {
				"id": "2008_PA",
				"year": 2008,
				"name": "Clinton, Hillary",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 5014,
				"parties": [
					"Write-In"
				]
			},
			"Paul, Ron": {
				"id": "2008_PA",
				"year": 2008,
				"name": "Paul, Ron",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 3849,
				"parties": [
					"Write-In"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_PA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 1092,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_RI": {
			"Obama, Barack": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 296571,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_RI",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 165391,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 4829,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 1382,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_RI",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 797,
				"parties": [
					"Green"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 675,
				"parties": [
					"Constitution"
				]
			},
			"Clinton, Hillary": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Clinton, Hillary",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 655,
				"parties": [
					"Write-In"
				]
			},
			"Paul, Ron": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Paul, Ron",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 472,
				"parties": [
					"Write-In"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_RI",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 122,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"No Vote,": {
				"id": "2008_RI",
				"year": 2008,
				"name": "No Vote,",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 43,
				"parties": [
					"Write-In"
				]
			},
			"Huckabee, Mike": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Huckabee, Mike",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 34,
				"parties": [
					"Write-In"
				]
			},
			"Romney, Mitt": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Romney, Mitt",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 25,
				"parties": [
					"Write-In"
				]
			},
			"Gore, Al": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Gore, Al",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 15,
				"parties": [
					"Write-In"
				]
			},
			"Powell, Colin": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Powell, Colin",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Mouse, Mickey": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Mouse, Mickey",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 11,
				"parties": [
					"Write-In"
				]
			},
			"None of Above,": {
				"id": "2008_RI",
				"year": 2008,
				"name": "None of Above,",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 11,
				"parties": [
					"Write-In"
				]
			},
			"Colbert, Stephen": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Colbert, Stephen",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Jesus,": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Jesus,",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Bloomberg, Michael": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Bloomberg, Michael",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Clinton, Bill": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Clinton, Bill",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Cianci, Buddy": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Cianci, Buddy",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Keyes, Alan": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Kucinich, Dennis": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Kucinich, Dennis",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Plumber, Joe the": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Plumber, Joe the",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Ventura, Jessie": {
				"id": "2008_RI",
				"year": 2008,
				"name": "Ventura, Jessie",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_SC": {
			"McCain, John": {
				"id": "2008_SC",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 1034896,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_SC",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 862449,
				"parties": [
					"Democratic"
				]
			},
			"Barr, Bob": {
				"id": "2008_SC",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 7283,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_SC",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 6827,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2008_SC",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 5053,
				"parties": [
					"Petition"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_SC",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 4461,
				"parties": [
					"Green"
				]
			}
		},
		"2008_SD": {
			"McCain, John": {
				"id": "2008_SD",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 203054,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_SD",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 170924,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_SD",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 4267,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_SD",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 1895,
				"parties": [
					"Constitution"
				]
			},
			"Barr, Bob": {
				"id": "2008_SD",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 1835,
				"parties": [
					"Independent"
				]
			}
		},
		"2008_TN": {
			"McCain, John": {
				"id": "2008_TN",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1479178,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_TN",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1087437,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_TN",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 11560,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_TN",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 8547,
				"parties": [
					"Independent"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_TN",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 8191,
				"parties": [
					"Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_TN",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 2499,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_TN",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1326,
				"parties": [
					"Independent"
				]
			},
			"Jay, Charles": {
				"id": "2008_TN",
				"year": 2008,
				"name": "Jay, Charles",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1011,
				"parties": [
					"Independent"
				]
			}
		},
		"2008_TX": {
			"McCain, John": {
				"id": "2008_TX",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "TX",
				"state": "Texas",
				"votes": 4479328,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "TX",
				"state": "Texas",
				"votes": 3528633,
				"parties": [
					"Democratic"
				]
			},
			"Barr, Bob": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "TX",
				"state": "Texas",
				"votes": 56116,
				"parties": [
					"Libertarian"
				]
			},
			"Nader, Ralph": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "TX",
				"state": "Texas",
				"votes": 5751,
				"parties": [
					"Write-In"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "TX",
				"state": "Texas",
				"votes": 5708,
				"parties": [
					"Write-In"
				]
			},
			"Keyes, Alan": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "TX",
				"state": "Texas",
				"votes": 895,
				"parties": [
					"Write-In"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_TX",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "TX",
				"state": "Texas",
				"votes": 909,
				"parties": [
					"Write-In"
				]
			},
			"Hill, Thaddaus": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Hill, Thaddaus",
				"abbr": "TX",
				"state": "Texas",
				"votes": 216,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Brian": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "TX",
				"state": "Texas",
				"votes": 135,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_TX",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "TX",
				"state": "Texas",
				"votes": 104,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_UT": {
			"McCain, John": {
				"id": "2008_UT",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "UT",
				"state": "Utah",
				"votes": 596030,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "UT",
				"state": "Utah",
				"votes": 327670,
				"parties": [
					"Democratic"
				]
			},
			"Baldwin, Charles O. \"Chuck\"": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Baldwin, Charles O. \"Chuck\"",
				"abbr": "UT",
				"state": "Utah",
				"votes": 12012,
				"parties": [
					"Constitution"
				]
			},
			"Nader, Ralph": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "UT",
				"state": "Utah",
				"votes": 8416,
				"parties": [
					"Unaffiliated"
				]
			},
			"Barr, Bob": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "UT",
				"state": "Utah",
				"votes": 6966,
				"parties": [
					"Libertarian"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_UT",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "UT",
				"state": "Utah",
				"votes": 982,
				"parties": [
					"Unaffiliated"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_UT",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "UT",
				"state": "Utah",
				"votes": 262,
				"parties": [
					"Unaffiliated"
				]
			},
			"Keyes, Alan": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Keyes, Alan",
				"abbr": "UT",
				"state": "Utah",
				"votes": 25,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Moore, Frank",
				"abbr": "UT",
				"state": "Utah",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Jonathan": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Allen, Jonathan",
				"abbr": "UT",
				"state": "Utah",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Jay, Charles": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Jay, Charles",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Sponheim, David Jon": {
				"id": "2008_UT",
				"year": 2008,
				"name": "Sponheim, David Jon",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_VT": {
			"Obama, Barack": {
				"id": "2008_VT",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 219262,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_VT",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 98974,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_VT",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 3339,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_VT",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 1067,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_VT",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 500,
				"parties": [
					"Constitution"
				]
			},
			"Calero, Roger": {
				"id": "2008_VT",
				"year": 2008,
				"name": "Calero, Roger",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 150,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_VT",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 149,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Moore, Brian": {
				"id": "2008_VT",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 141,
				"parties": [
					"Liberty Union"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_VT",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 66,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_VA": {
			"Obama, Barack": {
				"id": "2008_VA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1959532,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_VA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1725005,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_VA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 11483,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_VA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 11067,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_VA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 7474,
				"parties": [
					"Independent Green Party"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_VA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 2344,
				"parties": [
					"Green"
				]
			}
		},
		"2008_WA": {
			"Obama, Barack": {
				"id": "2008_WA",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1750848,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_WA",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1229216,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_WA",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "WA",
				"state": "Washington",
				"votes": 29489,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_WA",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "WA",
				"state": "Washington",
				"votes": 12728,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_WA",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "WA",
				"state": "Washington",
				"votes": 9432,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_WA",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "WA",
				"state": "Washington",
				"votes": 3819,
				"parties": [
					"Green"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_WA",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "WA",
				"state": "Washington",
				"votes": 705,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Harris, James E.": {
				"id": "2008_WA",
				"year": 2008,
				"name": "Harris, James E.",
				"abbr": "WA",
				"state": "Washington",
				"votes": 641,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2008_WV": {
			"McCain, John Sidney, III": {
				"id": "2008_WV",
				"year": 2008,
				"name": "McCain, John Sidney, III",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 397466,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack Hussein": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Obama, Barack Hussein",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 303857,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 7219,
				"parties": [
					"No Affiliation"
				]
			},
			"Baldwin, Charles Obadiah": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Baldwin, Charles Obadiah",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 2465,
				"parties": [
					"Constitution"
				]
			},
			"McKinney, Cynthia Ann": {
				"id": "2008_WV",
				"year": 2008,
				"name": "McKinney, Cynthia Ann",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 2355,
				"parties": [
					"Mountain Party"
				]
			},
			"Claus, Santa": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Claus, Santa",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 59,
				"parties": [
					"Write-In"
				]
			},
			"Rice, David L.": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Rice, David L.",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Allen, Donald K.": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Allen, Donald K.",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Brown, Robert": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Brown, Robert",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Railey, Charles G. \"Bud\"": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Railey, Charles G. \"Bud\"",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Hobbs, Ron": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Hobbs, Ron",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Moore, Frank": {
				"id": "2008_WV",
				"year": 2008,
				"name": "Moore, Frank",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2008_WI": {
			"Obama, Barack": {
				"id": "2008_WI",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 1677211,
				"parties": [
					"Democratic"
				]
			},
			"McCain, John": {
				"id": "2008_WI",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 1262393,
				"parties": [
					"Republican"
				]
			},
			"Nader, Ralph": {
				"id": "2008_WI",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 17605,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_WI",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 8858,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_WI",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 5072,
				"parties": [
					"Independent"
				]
			},
			"McKinney, Cynthia": {
				"id": "2008_WI",
				"year": 2008,
				"name": "McKinney, Cynthia",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 4216,
				"parties": [
					"Wisconsin Greens"
				]
			},
			"Wamboldt, Jeffrey J.": {
				"id": "2008_WI",
				"year": 2008,
				"name": "Wamboldt, Jeffrey J.",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 764,
				"parties": [
					"Independent"
				]
			},
			"Moore, Brian": {
				"id": "2008_WI",
				"year": 2008,
				"name": "Moore, Brian",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 540,
				"parties": [
					"Independent"
				]
			},
			"La Riva, Gloria": {
				"id": "2008_WI",
				"year": 2008,
				"name": "La Riva, Gloria",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 237,
				"parties": [
					"Independent"
				]
			}
		},
		"2008_WY": {
			"McCain, John": {
				"id": "2008_WY",
				"year": 2008,
				"name": "McCain, John",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 164958,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2008_WY",
				"year": 2008,
				"name": "Obama, Barack",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 82868,
				"parties": [
					"Democratic"
				]
			},
			"Nader, Ralph": {
				"id": "2008_WY",
				"year": 2008,
				"name": "Nader, Ralph",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 2525,
				"parties": [
					"Independent"
				]
			},
			"Barr, Bob": {
				"id": "2008_WY",
				"year": 2008,
				"name": "Barr, Bob",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 1594,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2008_WY",
				"year": 2008,
				"name": "Baldwin, Chuck",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 1192,
				"parties": [
					"Independent"
				]
			}
		}
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = {
		"2012_AL": {
			"Romney, Mitt": {
				"id": "2012_AL",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 1255925,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_AL",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 795696,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_AL",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 12328,
				"parties": [
					"Independent"
				]
			},
			"Stein, Jill": {
				"id": "2012_AL",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 3397,
				"parties": [
					"Independent"
				]
			},
			"Goode, Virgil H., Jr.": {
				"id": "2012_AL",
				"year": 2012,
				"name": "Goode, Virgil H., Jr.",
				"abbr": "AL",
				"state": "Alabama",
				"votes": 2981,
				"parties": [
					"Independent"
				]
			}
		},
		"2012_AK": {
			"Romney, Mitt": {
				"id": "2012_AK",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 164676,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_AK",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 122640,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_AK",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 7392,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_AK",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "AK",
				"state": "Alaska",
				"votes": 2917,
				"parties": [
					"Green"
				]
			}
		},
		"2012_AZ": {
			"Romney, Mitt": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 1233654,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 1025232,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 32100,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 7816,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 289,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 119,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 17,
				"parties": [
					"Write-In"
				]
			},
			"Christensen, Will": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Christensen, Will",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Knill, Dennis": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Knill, Dennis",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Tittle, Sheila \"Samm\"": {
				"id": "2012_AZ",
				"year": 2012,
				"name": "Tittle, Sheila \"Samm\"",
				"abbr": "AZ",
				"state": "Arizona",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_AR": {
			"Romney, Mitt": {
				"id": "2012_AR",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 647744,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_AR",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 394409,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_AR",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 16276,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_AR",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 9305,
				"parties": [
					"Green"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_AR",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "AR",
				"state": "Arkansas",
				"votes": 1734,
				"parties": [
					"Socialism and Liberation Party"
				]
			}
		},
		"2012_CA": {
			"Obama, Barack": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "CA",
				"state": "California",
				"votes": 7854285,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "CA",
				"state": "California",
				"votes": 4839958,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "CA",
				"state": "California",
				"votes": 143221,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "CA",
				"state": "California",
				"votes": 85638,
				"parties": [
					"Green"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "CA",
				"state": "California",
				"votes": 53824,
				"parties": [
					"Peace and Freedom"
				]
			},
			"Hoefling, Thomas": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Hoefling, Thomas",
				"abbr": "CA",
				"state": "California",
				"votes": 38372,
				"parties": [
					"American Independent"
				]
			},
			"Paul, Ron": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Paul, Ron",
				"abbr": "CA",
				"state": "California",
				"votes": 21461,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "CA",
				"state": "California",
				"votes": 992,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "CA",
				"state": "California",
				"votes": 503,
				"parties": [
					"Write-In"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "CA",
				"state": "California",
				"votes": 82,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerry": {
				"id": "2012_CA",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "CA",
				"state": "California",
				"votes": 79,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "CA",
				"state": "California",
				"votes": 72,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "CA",
				"state": "California",
				"votes": 54,
				"parties": [
					"Write-In"
				]
			},
			"Tittle, Sheila \"Samm\"": {
				"id": "2012_CA",
				"year": 2012,
				"name": "Tittle, Sheila \"Samm\"",
				"abbr": "CA",
				"state": "California",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_CO": {
			"Obama, Barack": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1323102,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1185243,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 35545,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 7508,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil H., Jr.": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Goode, Virgil H., Jr.",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 6234,
				"parties": [
					"American Constitution Party"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 5059,
				"parties": [
					"Peace and Freedom"
				]
			},
			"Reed, Jill": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 2589,
				"parties": [
					"Unaffiliated"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 1260,
				"parties": [
					"Justice Party"
				]
			},
			"Tittle, Sheila 'Samm'": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Tittle, Sheila 'Samm'",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 792,
				"parties": [
					"We the People"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 679,
				"parties": [
					"America’s Party"
				]
			},
			"La Riva, Gloria": {
				"id": "2012_CO",
				"year": 2012,
				"name": "La Riva, Gloria",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 317,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 308,
				"parties": [
					"Socialist Party USA"
				]
			},
			"Miller, Merlin": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Miller, Merlin",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 266,
				"parties": [
					"American Third Position"
				]
			},
			"Stevens, Thomas Robert": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Stevens, Thomas Robert",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 235,
				"parties": [
					"Objectivist Party"
				]
			},
			"Harris, James": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 192,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"White, Jerry": {
				"id": "2012_CO",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 189,
				"parties": [
					"Socialist Equality Party"
				]
			},
			"Terry, Randall": {
				"id": "2012_CO",
				"year": 2012,
				"name": "Terry, Randall",
				"abbr": "CO",
				"state": "Colorado",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_CT": {
			"Obama, Barack": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 905083,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 634892,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 12580,
				"parties": [
					"Libertarian"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 5487,
				"parties": [
					"Independent Party"
				]
			},
			"Stein, Jill": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 863,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 25,
				"parties": [
					"Write-In"
				]
			},
			"Warner, Gerald": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Warner, Gerald",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 19,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James E.": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Harris, James E.",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Sizemore, Raymond": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Sizemore, Raymond",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_CT",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "CT",
				"state": "Connecticut",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_DE": {
			"Obama, Barack": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 242584,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 165484,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 3882,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 1940,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 23,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_DE",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "DE",
				"state": "Delaware",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_DC": {
			"Obama, Barack": {
				"id": "2012_DC",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 267070,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_DC",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 21381,
				"parties": [
					"Republican"
				]
			},
			"Stein, Jill": {
				"id": "2012_DC",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 2458,
				"parties": [
					"D.C. Statehood Green"
				]
			},
			"Johnson, Gary": {
				"id": "2012_DC",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "DC",
				"state": "District of Columbia",
				"votes": 2083,
				"parties": [
					"Libertarian"
				]
			}
		},
		"2012_FL": {
			"Obama, Barack": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "FL",
				"state": "Florida",
				"votes": 4237756,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "FL",
				"state": "Florida",
				"votes": 4163447,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "FL",
				"state": "Florida",
				"votes": 44726,
				"parties": [
					"Libertarian Party of Florida"
				]
			},
			"Stein, Jill": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "FL",
				"state": "Florida",
				"votes": 8947,
				"parties": [
					"Green Party of Florida"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "FL",
				"state": "Florida",
				"votes": 8154,
				"parties": [
					"Peace and Freedom Party of Florida"
				]
			},
			"Stevens, Thomas Robert": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Stevens, Thomas Robert",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3856,
				"parties": [
					"Objectivist Party of Florida"
				]
			},
			"Goode, Virgil H., Jr.": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Goode, Virgil H., Jr.",
				"abbr": "FL",
				"state": "Florida",
				"votes": 2607,
				"parties": [
					"Constitution Party of Florida"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "FL",
				"state": "Florida",
				"votes": 1754,
				"parties": [
					"Justice Party of Florida"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "FL",
				"state": "Florida",
				"votes": 946,
				"parties": [
					"America’s Party of Florida"
				]
			},
			"Barnett, Andre": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Barnett, Andre",
				"abbr": "FL",
				"state": "Florida",
				"votes": 820,
				"parties": [
					"Reform"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "FL",
				"state": "Florida",
				"votes": 799,
				"parties": [
					"Socialist Party of Florida"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "FL",
				"state": "Florida",
				"votes": 322,
				"parties": [
					"Party for Socialism and Liberation - Florida"
				]
			},
			"Reed, Jill": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "FL",
				"state": "Florida",
				"votes": 36,
				"parties": [
					"Write-In"
				]
			},
			"Duncan, Richard": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Duncan, Richard",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen G.": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Durham, Stephen G.",
				"abbr": "FL",
				"state": "Florida",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Magee, Erin Kent": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Magee, Erin Kent",
				"abbr": "FL",
				"state": "Florida",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Coniglio, Andrew Charles": {
				"id": "2012_FL",
				"year": 2012,
				"name": "Coniglio, Andrew Charles",
				"abbr": "FL",
				"state": "Florida",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_GA": {
			"Romney, Mitt": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 2078688,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1773827,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 45324,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1516,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 432,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 154,
				"parties": [
					"Write-In"
				]
			},
			"Hykes, Darrell": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Hykes, Darrell",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 55,
				"parties": [
					"Write-In"
				]
			},
			"Reid, Jill": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Reid, Jill",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 30,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 21,
				"parties": [
					"Write-In"
				]
			},
			"Byrne, David C.": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Byrne, David C.",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Magee, Erin Kent": {
				"id": "2012_GA",
				"year": 2012,
				"name": "Magee, Erin Kent",
				"abbr": "GA",
				"state": "Georgia",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_HI": {
			"Obama, Barack": {
				"id": "2012_HI",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 306658,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_HI",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 121015,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_HI",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 3840,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_HI",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "HI",
				"state": "Hawaii",
				"votes": 3184,
				"parties": [
					"Green"
				]
			}
		},
		"2012_ID": {
			"Romney, Mitt": {
				"id": "2012_ID",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 420911,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_ID",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 212787,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_ID",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 9453,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_ID",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 4402,
				"parties": [
					"Independent"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_ID",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 2499,
				"parties": [
					"Independent"
				]
			},
			"Goode, Virgil H.": {
				"id": "2012_ID",
				"year": 2012,
				"name": "Goode, Virgil H.",
				"abbr": "ID",
				"state": "Idaho",
				"votes": 2222,
				"parties": [
					"Constitution"
				]
			}
		},
		"2012_IL": {
			"Obama, Barack": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3019512,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2135216,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 56229,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 30222,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil / Clymer, Jim": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Goode, Virgil / Clymer, Jim",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 233,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 185,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 182,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 121,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 22,
				"parties": [
					"Write-In"
				]
			},
			"Hawkins, Michael": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Hawkins, Michael",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 16,
				"parties": [
					"Write-In"
				]
			},
			"Cary, Tom": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Cary, Tom",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill / Cary, Tom": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Reed, Jill / Cary, Tom",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 10,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerry": {
				"id": "2012_IL",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Roth, Cecil": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Roth, Cecil",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Scherrer, Phyllis": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Scherrer, Phyllis",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Clymer, Jim": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Clymer, Jim",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Prokopich, Barbara": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Prokopich, Barbara",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerry / Scherrer, Phyllis": {
				"id": "2012_IL",
				"year": 2012,
				"name": "White, Jerry / Scherrer, Phyllis",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom / Ellis, Jonathan": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Hoefling, Tom / Ellis, Jonathan",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Knill, Dennis": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Knill, Dennis",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Tyree, Roy Wayne": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Tyree, Roy Wayne",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Chehade, Paul": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Chehade, Paul",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Chehade, Paul / McAllister, Steve": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Chehade, Paul / McAllister, Steve",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen / Lopez, Christina": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Durham, Stephen / Lopez, Christina",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Maxwell, Lynn": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Maxwell, Lynn",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Struck, James T.": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Struck, James T.",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Ellis, Jonathan": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Ellis, Jonathan",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Frost, Stephen James": {
				"id": "2012_IL",
				"year": 2012,
				"name": "Frost, Stephen James",
				"abbr": "IL",
				"state": "Illinois",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_IN": {
			"Romney, Mitt": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1420543,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1152887,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 50111,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 625,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil H., Jr.": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Goode, Virgil H., Jr.",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 290,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 35,
				"parties": [
					"Write-In"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 17,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Terry, Randall A.": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Terry, Randall A.",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Knill, Dennis": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Knill, Dennis",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Dummett, John A., Jr.": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Dummett, John A., Jr.",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Lopez, Christina": {
				"id": "2012_IN",
				"year": 2012,
				"name": "Lopez, Christina",
				"abbr": "IN",
				"state": "Indiana",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_IA": {
			"Obama, Barack": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 822544,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 730617,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 12926,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 3769,
				"parties": [
					"Iowa Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 3038,
				"parties": [
					"Constitution"
				]
			},
			"Litzel, Jerry": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Litzel, Jerry",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 1027,
				"parties": [
					"Nominated by Petition"
				]
			},
			"Harris, James": {
				"id": "2012_IA",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 445,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"La Riva, Gloria": {
				"id": "2012_IA",
				"year": 2012,
				"name": "La Riva, Gloria",
				"abbr": "IA",
				"state": "Iowa",
				"votes": 372,
				"parties": [
					"Party for Socialism and Liberation"
				]
			}
		},
		"2012_KS": {
			"Romney, Mitt": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 692634,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 440726,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 20456,
				"parties": [
					"Libertarian"
				]
			},
			"Baldwin, Chuck": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Baldwin, Chuck",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 5017,
				"parties": [
					"Reform"
				]
			},
			"Stein, Jill E.": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Stein, Jill E.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 714,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 187,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross \"Rocky\" C.": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Anderson, Ross \"Rocky\" C.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 95,
				"parties": [
					"Write-In"
				]
			},
			"Barr, Roseanne C.": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Barr, Roseanne C.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 58,
				"parties": [
					"Write-In"
				]
			},
			"Bush, Kent W.": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Bush, Kent W.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 48,
				"parties": [
					"Write-In"
				]
			},
			"Barnett, Andre": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Barnett, Andre",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 19,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill A.": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Reed, Jill A.",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Christensen, Will": {
				"id": "2012_KS",
				"year": 2012,
				"name": "Christensen, Will",
				"abbr": "KS",
				"state": "Kansas",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_KY": {
			"Romney, Mitt": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1087190,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 679370,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 17063,
				"parties": [
					"Libertarian"
				]
			},
			"Terry, Randall A.": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Terry, Randall A.",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 6872,
				"parties": [
					"Independent"
				]
			},
			"Stein, Jill": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 6337,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 245,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 60,
				"parties": [
					"Write-In"
				]
			},
			"Duncan, Richard": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Duncan, Richard",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 37,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 30,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerry": {
				"id": "2012_KY",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"House, Louis Todd": {
				"id": "2012_KY",
				"year": 2012,
				"name": "House, Louis Todd",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Knill, Dennis": {
				"id": "2012_KY",
				"year": 2012,
				"name": "Knill, Dennis",
				"abbr": "KY",
				"state": "Kentucky",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_LA": {
			"Romney, Mitt": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1152262,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 809141,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 18157,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 6978,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 2508,
				"parties": [
					"Constitution"
				]
			},
			"Tittle, Sheila": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Tittle, Sheila",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1767,
				"parties": [
					"We the People"
				]
			},
			"Anderson, Ross": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Anderson, Ross",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 1368,
				"parties": [
					"Justice Party"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 622,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Fellure, Jack": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Fellure, Jack",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 518,
				"parties": [
					"Prohibition Party"
				]
			},
			"Harris, James": {
				"id": "2012_LA",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 389,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"White, Jerry": {
				"id": "2012_LA",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "LA",
				"state": "Louisiana",
				"votes": 355,
				"parties": [
					"Socialist Equality Party"
				]
			}
		},
		"2012_ME": {
			"Obama, Barack": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "ME",
				"state": "Maine",
				"votes": 401306,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "ME",
				"state": "Maine",
				"votes": 292276,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary E.": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Johnson, Gary E.",
				"abbr": "ME",
				"state": "Maine",
				"votes": 9352,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "ME",
				"state": "Maine",
				"votes": 8119,
				"parties": [
					"Green Independent"
				]
			},
			"Paul, Ronald E.": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Paul, Ronald E.",
				"abbr": "ME",
				"state": "Maine",
				"votes": 2035,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C.": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Anderson, Ross C.",
				"abbr": "ME",
				"state": "Maine",
				"votes": 62,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill Ann": {
				"id": "2012_ME",
				"year": 2012,
				"name": "Reed, Jill Ann",
				"abbr": "ME",
				"state": "Maine",
				"votes": 30,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_MD": {
			"Obama, Barack": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1677844,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 971869,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 30195,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 17110,
				"parties": [
					"Green"
				]
			},
			"Other": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Other",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 8788,
				"parties": [
					"Write-In"
				]
			},
			"Claus, Santa": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Claus, Santa",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 625,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 418,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 204,
				"parties": [
					"Write-In"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 64,
				"parties": [
					"Write-In"
				]
			},
			"Clymer, James": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Clymer, James",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 35,
				"parties": [
					"Write-In"
				]
			},
			"Miller, Merlin": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Miller, Merlin",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 26,
				"parties": [
					"Write-In"
				]
			},
			"Barnett, Andre": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Barnett, Andre",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 19,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 19,
				"parties": [
					"Write-In"
				]
			},
			"Briscoe, Tiffany Renee": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Briscoe, Tiffany Renee",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Lydick, Matthew": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Lydick, Matthew",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Duncan, Richard": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Duncan, Richard",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 15,
				"parties": [
					"Write-In"
				]
			},
			"Chehade, Paul": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Chehade, Paul",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 13,
				"parties": [
					"Write-In"
				]
			},
			"Dickson, Fred Donald, Jr.": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Dickson, Fred Donald, Jr.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Crosby, David M.": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Crosby, David M.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Hykes, Darrell": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Hykes, Darrell",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Boyles, Michael David": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Boyles, Michael David",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Keyton, Nelson": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Keyton, Nelson",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"French, Dwight Kenneth": {
				"id": "2012_MD",
				"year": 2012,
				"name": "French, Dwight Kenneth",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Knill, Dennis": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Knill, Dennis",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Prokopich, Barbara A.": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Prokopich, Barbara A.",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Dietz, Robert William": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Dietz, Robert William",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Morstad, Dean": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Morstad, Dean",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"O'Hara, Terrance James": {
				"id": "2012_MD",
				"year": 2012,
				"name": "O'Hara, Terrance James",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Roth, Cecil James": {
				"id": "2012_MD",
				"year": 2012,
				"name": "Roth, Cecil James",
				"abbr": "MD",
				"state": "Maryland",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_MA": {
			"Obama, Barack": {
				"id": "2012_MA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 1921290,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_MA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 1188314,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 30920,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_MA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 20691,
				"parties": [
					"Green-Rainbow"
				]
			},
			"All Others": {
				"id": "2012_MA",
				"year": 2012,
				"name": "All Others",
				"abbr": "MA",
				"state": "Massachusetts",
				"votes": 6552,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_MI": {
			"Obama, Barack": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 2564569,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 2115256,
				"parties": [
					"Republican"
				]
			},
			"Stein, Jill": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 21897,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil, Jr.": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Goode, Virgil, Jr.",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 16119,
				"parties": [
					"U.S. Taxpayers"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 7774,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Ross": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Anderson, Ross",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 5147,
				"parties": [
					"Natural Law Party"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 89,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerry": {
				"id": "2012_MI",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 68,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_MI",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "MI",
				"state": "Michigan",
				"votes": 42,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_MN": {
			"Obama, Barack": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1546167,
				"parties": [
					"Democratic-Farmer Labor"
				]
			},
			"Romney, Mitt": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1320225,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 35098,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 13023,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 3722,
				"parties": [
					"Constitution"
				]
			},
			"Carlson, Jim": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Carlson, Jim",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 3149,
				"parties": [
					"Grassroots"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1996,
				"parties": [
					"Justice Party"
				]
			},
			"Morstad, Dean": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Morstad, Dean",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1092,
				"parties": [
					"Constitutional Government"
				]
			},
			"Harris, James": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1051,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 397,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 46,
				"parties": [
					"Write-In"
				]
			},
			"Prokopich, Barbara": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Prokopich, Barbara",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 35,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 8,
				"parties": [
					"Write-In"
				]
			},
			"Barnett, Andre": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Barnett, Andre",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Christensen, Will": {
				"id": "2012_MN",
				"year": 2012,
				"name": "Christensen, Will",
				"abbr": "MN",
				"state": "Minnesota",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_MS": {
			"Romney, Mitt": {
				"id": "2012_MS",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 710746,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_MS",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 562949,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MS",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 6676,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil": {
				"id": "2012_MS",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 2609,
				"parties": [
					"Constitution"
				]
			},
			"Stein, Jill A.": {
				"id": "2012_MS",
				"year": 2012,
				"name": "Stein, Jill A.",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1588,
				"parties": [
					"Green"
				]
			},
			"Washer, Barbara Dale": {
				"id": "2012_MS",
				"year": 2012,
				"name": "Washer, Barbara Dale",
				"abbr": "MS",
				"state": "Mississippi",
				"votes": 1016,
				"parties": [
					"Reform"
				]
			}
		},
		"2012_MO": {
			"Romney, Mitt": {
				"id": "2012_MO",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1482440,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_MO",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 1223796,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MO",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 43151,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil": {
				"id": "2012_MO",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "MO",
				"state": "Missouri",
				"votes": 7936,
				"parties": [
					"Constitution"
				]
			}
		},
		"2012_MT": {
			"Romney, Mitt": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "MT",
				"state": "Montana",
				"votes": 267928,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "MT",
				"state": "Montana",
				"votes": 201839,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "MT",
				"state": "Montana",
				"votes": 14165,
				"parties": [
					"Libertarian"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "MT",
				"state": "Montana",
				"votes": 59,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "MT",
				"state": "Montana",
				"votes": 39,
				"parties": [
					"Write-In"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "MT",
				"state": "Montana",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "MT",
				"state": "Montana",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "MT",
				"state": "Montana",
				"votes": 4,
				"parties": [
					"Write-In"
				]
			},
			"Barnett, Andre": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Barnett, Andre",
				"abbr": "MT",
				"state": "Montana",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Logsdon, Alexis": {
				"id": "2012_MT",
				"year": 2012,
				"name": "Logsdon, Alexis",
				"abbr": "MT",
				"state": "Montana",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_NE": {
			"Romney, Mitt": {
				"id": "2012_NE",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 475064,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_NE",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 302081,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NE",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 11109,
				"parties": [
					"Libertarian"
				]
			},
			"Terry, Randall A.": {
				"id": "2012_NE",
				"year": 2012,
				"name": "Terry, Randall A.",
				"abbr": "NE",
				"state": "Nebraska",
				"votes": 2408,
				"parties": [
					"By Petition"
				]
			}
		},
		"2012_NV": {
			"Obama, Barack": {
				"id": "2012_NV",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 531373,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_NV",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 463567,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NV",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 10968,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil": {
				"id": "2012_NV",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "NV",
				"state": "Nevada",
				"votes": 3240,
				"parties": [
					"Independent American  Party"
				]
			}
		},
		"2012_NH": {
			"Obama, Barack": {
				"id": "2012_NH",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 369561,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_NH",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 329918,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NH",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 8212,
				"parties": [
					"Libertarian"
				]
			},
			"Paul, Ron": {
				"id": "2012_NH",
				"year": 2012,
				"name": "Paul, Ron",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 1374,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_NH",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 708,
				"parties": [
					"Constitution"
				]
			},
			"Stein, Jill": {
				"id": "2012_NH",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "NH",
				"state": "New Hampshire",
				"votes": 324,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_NJ": {
			"Obama, Barack": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 2125101,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1477568,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 21045,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 9888,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 2064,
				"parties": [
					"Constitution"
				]
			},
			"Anderson, Ross C. (Rocky)": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Anderson, Ross C. (Rocky)",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1724,
				"parties": [
					"New Jersey Justice Party"
				]
			},
			"Boss, Jeff": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Boss, Jeff",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 1007,
				"parties": [
					"NSA Did 911"
				]
			},
			"Harris, James": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 710,
				"parties": [
					"Socialist Workers Party"
				]
			},
			"Miller, Merlin": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Miller, Merlin",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 664,
				"parties": [
					"American Third Position"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_NJ",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "NJ",
				"state": "New Jersey",
				"votes": 521,
				"parties": [
					"Socialism and Liberation Party"
				]
			}
		},
		"2012_NM": {
			"Obama, Barack": {
				"id": "2012_NM",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 415335,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_NM",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 335788,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NM",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 27788,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_NM",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 2691,
				"parties": [
					"Green"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_NM",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 1174,
				"parties": [
					"New Mexico Independent Party"
				]
			},
			"Goode, Virgil": {
				"id": "2012_NM",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "NM",
				"state": "New Mexico",
				"votes": 982,
				"parties": [
					"Constitution"
				]
			}
		},
		"2012_NY": {
			"Obama, Barack": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NY",
				"state": "New York",
				"votes": 4485741,
				"parties": [
					"Democratic",
					"Working Families"
				]
			},
			"Romney, Mitt": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NY",
				"state": "New York",
				"votes": 2490431,
				"parties": [
					"Republican",
					"Conservative"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NY",
				"state": "New York",
				"votes": 47256,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "NY",
				"state": "New York",
				"votes": 39982,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "NY",
				"state": "New York",
				"votes": 6274,
				"parties": [
					"Constitution"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "NY",
				"state": "New York",
				"votes": 2050,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Anderson, Ross C.": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Anderson, Ross C.",
				"abbr": "NY",
				"state": "New York",
				"votes": 217,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "NY",
				"state": "New York",
				"votes": 34,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "NY",
				"state": "New York",
				"votes": 34,
				"parties": [
					"Write-In"
				]
			},
			"Harris, James": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "NY",
				"state": "New York",
				"votes": 27,
				"parties": [
					"Write-In"
				]
			},
			"White, Jerry": {
				"id": "2012_NY",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "NY",
				"state": "New York",
				"votes": 19,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "NY",
				"state": "New York",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Miller, Merlin": {
				"id": "2012_NY",
				"year": 2012,
				"name": "Miller, Merlin",
				"abbr": "NY",
				"state": "New York",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_NC": {
			"Romney, Mitt": {
				"id": "2012_NC",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 2270395,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_NC",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 2178391,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_NC",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 44515,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil": {
				"id": "2012_NC",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "NC",
				"state": "North Carolina",
				"votes": 534,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_ND": {
			"Romney, Mitt": {
				"id": "2012_ND",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 188163,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_ND",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 124827,
				"parties": [
					"Democratic-Nonpartisan League"
				]
			},
			"Johnson, Gary": {
				"id": "2012_ND",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 5231,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_ND",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 1361,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_ND",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "ND",
				"state": "North Dakota",
				"votes": 1185,
				"parties": [
					"Constitution"
				]
			}
		},
		"2012_OH": {
			"Obama, Barack": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2827710,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2661433,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 49493,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 18574,
				"parties": [
					"Green"
				]
			},
			"Duncan, Richard": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Duncan, Richard",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 12502,
				"parties": [
					"Independent"
				]
			},
			"Goode, Virgil": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 8151,
				"parties": [
					"Constitution"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 2944,
				"parties": [
					"Socialist Party USA"
				]
			},
			"Vargo, Mike": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Vargo, Mike",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 12,
				"parties": [
					"Write-In"
				]
			},
			"Terry, Randall": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Terry, Randall",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 7,
				"parties": [
					"Write-In"
				]
			},
			"Daniels, Susan": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Daniels, Susan",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Keyton, Nelson": {
				"id": "2012_OH",
				"year": 2012,
				"name": "Keyton, Nelson",
				"abbr": "OH",
				"state": "Ohio",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_OK": {
			"Romney, Mitt": {
				"id": "2012_OK",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "OK",
				"state": "Oklahoma",
				"votes": 891325,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_OK",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "OK",
				"state": "Oklahoma",
				"votes": 443547,
				"parties": [
					"Democratic"
				]
			}
		},
		"2012_OR": {
			"Obama, Barack": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 970488,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 754175,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 24089,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 19427,
				"parties": [
					"Pacific Green"
				]
			},
			"Miscellaneous": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Miscellaneous",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 13275,
				"parties": [
					"Write-In"
				]
			},
			"Christensen, Will": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Christensen, Will",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 4432,
				"parties": [
					"Constitution"
				]
			},
			"Anderson, Ross C. (Rocky)": {
				"id": "2012_OR",
				"year": 2012,
				"name": "Anderson, Ross C. (Rocky)",
				"abbr": "OR",
				"state": "Oregon",
				"votes": 3384,
				"parties": [
					"Progressive"
				]
			}
		},
		"2012_PA": {
			"Obama, Barack": {
				"id": "2012_PA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 2990274,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_PA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 2680434,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_PA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 49991,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_PA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 21341,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_PA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 383,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_PA",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "PA",
				"state": "Pennsylvania",
				"votes": 28,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_RI": {
			"Obama, Barack": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 279677,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 157204,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 4388,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 2421,
				"parties": [
					"Green"
				]
			},
			"Paul, Ron": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Paul, Ron",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 617,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 430,
				"parties": [
					"Constitution"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 416,
				"parties": [
					"Justice Party"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 132,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Clinton, Hillary": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Clinton, Hillary",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 64,
				"parties": [
					"Write-In"
				]
			},
			"Mouse, Mickey": {
				"id": "2012_RI",
				"year": 2012,
				"name": "Mouse, Mickey",
				"abbr": "RI",
				"state": "Rhode Island",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_SC": {
			"Romney, Mitt": {
				"id": "2012_SC",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 1071645,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_SC",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 865941,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_SC",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 16321,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_SC",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 5446,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_SC",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "SC",
				"state": "South Carolina",
				"votes": 4765,
				"parties": [
					"Constitution"
				]
			}
		},
		"2012_SD": {
			"Romney, Mitt": {
				"id": "2012_SD",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 210610,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_SD",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 145039,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_SD",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 5795,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil": {
				"id": "2012_SD",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "SD",
				"state": "South Dakota",
				"votes": 2371,
				"parties": [
					"Constitution"
				]
			}
		},
		"2012_TN": {
			"Romney, Mitt": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1462330,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 960709,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 18623,
				"parties": [
					"Independent"
				]
			},
			"Stein, Jill": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 6515,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 6022,
				"parties": [
					"Constitution"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 2639,
				"parties": [
					"Independent"
				]
			},
			"Miller, Merlin": {
				"id": "2012_TN",
				"year": 2012,
				"name": "Miller, Merlin",
				"abbr": "TN",
				"state": "Tennessee",
				"votes": 1739,
				"parties": [
					"Independent"
				]
			}
		},
		"2012_TX": {
			"Romney, Mitt": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "TX",
				"state": "Texas",
				"votes": 4569843,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "TX",
				"state": "Texas",
				"votes": 3308124,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "TX",
				"state": "Texas",
				"votes": 88580,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "TX",
				"state": "Texas",
				"votes": 24657,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "TX",
				"state": "Texas",
				"votes": 1287,
				"parties": [
					"Write-In"
				]
			},
			"Anderson, Rocky": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Anderson, Rocky",
				"abbr": "TX",
				"state": "Texas",
				"votes": 426,
				"parties": [
					"Write-In"
				]
			},
			"Hoefling, Tom": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Hoefling, Tom",
				"abbr": "TX",
				"state": "Texas",
				"votes": 374,
				"parties": [
					"Write-In"
				]
			},
			"Ayers, Avery": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Ayers, Avery",
				"abbr": "TX",
				"state": "Texas",
				"votes": 209,
				"parties": [
					"Write-In"
				]
			},
			"Alexander, Stewart": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Alexander, Stewart",
				"abbr": "TX",
				"state": "Texas",
				"votes": 162,
				"parties": [
					"Write-In"
				]
			},
			"Hill, Thaddaus": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Hill, Thaddaus",
				"abbr": "TX",
				"state": "Texas",
				"votes": 102,
				"parties": [
					"Write-In"
				]
			},
			"Barnett, Andre N.": {
				"id": "2012_TX",
				"year": 2012,
				"name": "Barnett, Andre N.",
				"abbr": "TX",
				"state": "Texas",
				"votes": 87,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_UT": {
			"Romney, Mitt": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "UT",
				"state": "Utah",
				"votes": 740600,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "UT",
				"state": "Utah",
				"votes": 251813,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "UT",
				"state": "Utah",
				"votes": 12572,
				"parties": [
					"Libertarian"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "UT",
				"state": "Utah",
				"votes": 5335,
				"parties": [
					"Justice Party"
				]
			},
			"Stein, Jill": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "UT",
				"state": "Utah",
				"votes": 3817,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "UT",
				"state": "Utah",
				"votes": 2871,
				"parties": [
					"Constitution"
				]
			},
			"La Riva, Gloria": {
				"id": "2012_UT",
				"year": 2012,
				"name": "La Riva, Gloria",
				"abbr": "UT",
				"state": "Utah",
				"votes": 393,
				"parties": [
					"Unaffiliated"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "UT",
				"state": "Utah",
				"votes": 18,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "UT",
				"state": "Utah",
				"votes": 6,
				"parties": [
					"Write-In"
				]
			},
			"Barnett, Andre": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Barnett, Andre",
				"abbr": "UT",
				"state": "Utah",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Christensen, Will": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Christensen, Will",
				"abbr": "UT",
				"state": "Utah",
				"votes": 5,
				"parties": [
					"Write-In"
				]
			},
			"Myers, Justin": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Myers, Justin",
				"abbr": "UT",
				"state": "Utah",
				"votes": 2,
				"parties": [
					"Write-In"
				]
			},
			"Durham, Stephen": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Durham, Stephen",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Hykes, Darrell": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Hykes, Darrell",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Morstad, Dean": {
				"id": "2012_UT",
				"year": 2012,
				"name": "Morstad, Dean",
				"abbr": "UT",
				"state": "Utah",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_VT": {
			"Obama, Barack": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 199239,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 92698,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 3487,
				"parties": [
					"Libertarian"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 1128,
				"parties": [
					"Justice Party"
				]
			},
			"Paul, Ron": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Paul, Ron",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 717,
				"parties": [
					"Write-In"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 695,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Stein, Jill": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 594,
				"parties": [
					"Write-In"
				]
			},
			"Goode, Virgil": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 13,
				"parties": [
					"Write-In"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_VT",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "VT",
				"state": "Vermont",
				"votes": 9,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_VA": {
			"Obama, Barack": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1971820,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1822522,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 31216,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 13058,
				"parties": [
					"Constitution"
				]
			},
			"Stein, Jill": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 8627,
				"parties": [
					"Green"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 76,
				"parties": [
					"Write-In"
				]
			},
			"Reed, Jill": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Reed, Jill",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 14,
				"parties": [
					"Write-In"
				]
			},
			"Glean, Joseph A. / Darlene Herleikson": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Glean, Joseph A. / Darlene Herleikson",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 3,
				"parties": [
					"Write-In"
				]
			},
			"Glean, Joseph A. / Jamie Johnson": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Glean, Joseph A. / Jamie Johnson",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			},
			"Tittle, Sheila \"Samm\"": {
				"id": "2012_VA",
				"year": 2012,
				"name": "Tittle, Sheila \"Samm\"",
				"abbr": "VA",
				"state": "Virginia",
				"votes": 1,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_WA": {
			"Obama, Barack": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1755396,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1290670,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "WA",
				"state": "Washington",
				"votes": 42202,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "WA",
				"state": "Washington",
				"votes": 20928,
				"parties": [
					"Green"
				]
			},
			"Goode, Virgil": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "WA",
				"state": "Washington",
				"votes": 8851,
				"parties": [
					"Constitution"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "WA",
				"state": "Washington",
				"votes": 4946,
				"parties": [
					"Justice Party"
				]
			},
			"Lindsay, Peta": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Lindsay, Peta",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1318,
				"parties": [
					"Socialism and Liberation Party"
				]
			},
			"Harris, James": {
				"id": "2012_WA",
				"year": 2012,
				"name": "Harris, James",
				"abbr": "WA",
				"state": "Washington",
				"votes": 1205,
				"parties": [
					"Socialist Workers Party"
				]
			}
		},
		"2012_WV": {
			"Romney, Mitt": {
				"id": "2012_WV",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 417655,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_WV",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 238269,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_WV",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 6302,
				"parties": [
					"Libertarian"
				]
			},
			"Stein, Jill": {
				"id": "2012_WV",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 4406,
				"parties": [
					"Mountain Party"
				]
			},
			"Terry, Randall": {
				"id": "2012_WV",
				"year": 2012,
				"name": "Terry, Randall",
				"abbr": "WV",
				"state": "West Virginia",
				"votes": 3806,
				"parties": [
					"No Party Affiliation"
				]
			}
		},
		"2012_WI": {
			"Obama, Barack": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 1620985,
				"parties": [
					"Democratic"
				]
			},
			"Romney, Mitt": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 1407966,
				"parties": [
					"Republican"
				]
			},
			"Johnson, Gary": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 20439,
				"parties": [
					"Independent"
				]
			},
			"Stein, Jill": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Stein, Jill",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 7665,
				"parties": [
					"Independent"
				]
			},
			"Goode, Virgil": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Goode, Virgil",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 4930,
				"parties": [
					"Constitution"
				]
			},
			"White, Jerry": {
				"id": "2012_WI",
				"year": 2012,
				"name": "White, Jerry",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 553,
				"parties": [
					"Independent"
				]
			},
			"La Riva, Gloria": {
				"id": "2012_WI",
				"year": 2012,
				"name": "La Riva, Gloria",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 526,
				"parties": [
					"Independent"
				]
			},
			"Anderson, Ross C. \"Rocky\"": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Anderson, Ross C. \"Rocky\"",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 112,
				"parties": [
					"Write-In"
				]
			},
			"Barr, Roseanne": {
				"id": "2012_WI",
				"year": 2012,
				"name": "Barr, Roseanne",
				"abbr": "WI",
				"state": "Wisconsin",
				"votes": 88,
				"parties": [
					"Write-In"
				]
			}
		},
		"2012_WY": {
			"Romney, Mitt": {
				"id": "2012_WY",
				"year": 2012,
				"name": "Romney, Mitt",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 170962,
				"parties": [
					"Republican"
				]
			},
			"Obama, Barack": {
				"id": "2012_WY",
				"year": 2012,
				"name": "Obama, Barack",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 69286,
				"parties": [
					"Democratic"
				]
			},
			"Johnson, Gary": {
				"id": "2012_WY",
				"year": 2012,
				"name": "Johnson, Gary",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 5326,
				"parties": [
					"Libertarian"
				]
			},
			"Goode, Virgil H.": {
				"id": "2012_WY",
				"year": 2012,
				"name": "Goode, Virgil H.",
				"abbr": "WY",
				"state": "Wyoming",
				"votes": 1452,
				"parties": [
					"Constitution"
				]
			}
		}
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*!\n * Bootstrap v3.3.7 (http://getbootstrap.com)\n * Copyright 2011-2016 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    box-shadow: none !important;\n    text-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  a[href]:after {\n    content: \" (\" attr(href) \")\"; }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\"; }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\"; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  img {\n    max-width: 100% !important; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important; }\n  .label {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(" + __webpack_require__(15) + ");\n  src: url(" + __webpack_require__(15) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(16) + ") format(\"woff2\"), url(" + __webpack_require__(17) + ") format(\"woff\"), url(" + __webpack_require__(18) + ") format(\"truetype\"), url(" + __webpack_require__(19) + "#glyphicons_halflingsregular) format(\"svg\"); }\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.glyphicon-asterisk:before {\n  content: \"*\"; }\n\n.glyphicon-plus:before {\n  content: \"+\"; }\n\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20AC\"; }\n\n.glyphicon-minus:before {\n  content: \"\\2212\"; }\n\n.glyphicon-cloud:before {\n  content: \"\\2601\"; }\n\n.glyphicon-envelope:before {\n  content: \"\\2709\"; }\n\n.glyphicon-pencil:before {\n  content: \"\\270F\"; }\n\n.glyphicon-glass:before {\n  content: \"\\E001\"; }\n\n.glyphicon-music:before {\n  content: \"\\E002\"; }\n\n.glyphicon-search:before {\n  content: \"\\E003\"; }\n\n.glyphicon-heart:before {\n  content: \"\\E005\"; }\n\n.glyphicon-star:before {\n  content: \"\\E006\"; }\n\n.glyphicon-star-empty:before {\n  content: \"\\E007\"; }\n\n.glyphicon-user:before {\n  content: \"\\E008\"; }\n\n.glyphicon-film:before {\n  content: \"\\E009\"; }\n\n.glyphicon-th-large:before {\n  content: \"\\E010\"; }\n\n.glyphicon-th:before {\n  content: \"\\E011\"; }\n\n.glyphicon-th-list:before {\n  content: \"\\E012\"; }\n\n.glyphicon-ok:before {\n  content: \"\\E013\"; }\n\n.glyphicon-remove:before {\n  content: \"\\E014\"; }\n\n.glyphicon-zoom-in:before {\n  content: \"\\E015\"; }\n\n.glyphicon-zoom-out:before {\n  content: \"\\E016\"; }\n\n.glyphicon-off:before {\n  content: \"\\E017\"; }\n\n.glyphicon-signal:before {\n  content: \"\\E018\"; }\n\n.glyphicon-cog:before {\n  content: \"\\E019\"; }\n\n.glyphicon-trash:before {\n  content: \"\\E020\"; }\n\n.glyphicon-home:before {\n  content: \"\\E021\"; }\n\n.glyphicon-file:before {\n  content: \"\\E022\"; }\n\n.glyphicon-time:before {\n  content: \"\\E023\"; }\n\n.glyphicon-road:before {\n  content: \"\\E024\"; }\n\n.glyphicon-download-alt:before {\n  content: \"\\E025\"; }\n\n.glyphicon-download:before {\n  content: \"\\E026\"; }\n\n.glyphicon-upload:before {\n  content: \"\\E027\"; }\n\n.glyphicon-inbox:before {\n  content: \"\\E028\"; }\n\n.glyphicon-play-circle:before {\n  content: \"\\E029\"; }\n\n.glyphicon-repeat:before {\n  content: \"\\E030\"; }\n\n.glyphicon-refresh:before {\n  content: \"\\E031\"; }\n\n.glyphicon-list-alt:before {\n  content: \"\\E032\"; }\n\n.glyphicon-lock:before {\n  content: \"\\E033\"; }\n\n.glyphicon-flag:before {\n  content: \"\\E034\"; }\n\n.glyphicon-headphones:before {\n  content: \"\\E035\"; }\n\n.glyphicon-volume-off:before {\n  content: \"\\E036\"; }\n\n.glyphicon-volume-down:before {\n  content: \"\\E037\"; }\n\n.glyphicon-volume-up:before {\n  content: \"\\E038\"; }\n\n.glyphicon-qrcode:before {\n  content: \"\\E039\"; }\n\n.glyphicon-barcode:before {\n  content: \"\\E040\"; }\n\n.glyphicon-tag:before {\n  content: \"\\E041\"; }\n\n.glyphicon-tags:before {\n  content: \"\\E042\"; }\n\n.glyphicon-book:before {\n  content: \"\\E043\"; }\n\n.glyphicon-bookmark:before {\n  content: \"\\E044\"; }\n\n.glyphicon-print:before {\n  content: \"\\E045\"; }\n\n.glyphicon-camera:before {\n  content: \"\\E046\"; }\n\n.glyphicon-font:before {\n  content: \"\\E047\"; }\n\n.glyphicon-bold:before {\n  content: \"\\E048\"; }\n\n.glyphicon-italic:before {\n  content: \"\\E049\"; }\n\n.glyphicon-text-height:before {\n  content: \"\\E050\"; }\n\n.glyphicon-text-width:before {\n  content: \"\\E051\"; }\n\n.glyphicon-align-left:before {\n  content: \"\\E052\"; }\n\n.glyphicon-align-center:before {\n  content: \"\\E053\"; }\n\n.glyphicon-align-right:before {\n  content: \"\\E054\"; }\n\n.glyphicon-align-justify:before {\n  content: \"\\E055\"; }\n\n.glyphicon-list:before {\n  content: \"\\E056\"; }\n\n.glyphicon-indent-left:before {\n  content: \"\\E057\"; }\n\n.glyphicon-indent-right:before {\n  content: \"\\E058\"; }\n\n.glyphicon-facetime-video:before {\n  content: \"\\E059\"; }\n\n.glyphicon-picture:before {\n  content: \"\\E060\"; }\n\n.glyphicon-map-marker:before {\n  content: \"\\E062\"; }\n\n.glyphicon-adjust:before {\n  content: \"\\E063\"; }\n\n.glyphicon-tint:before {\n  content: \"\\E064\"; }\n\n.glyphicon-edit:before {\n  content: \"\\E065\"; }\n\n.glyphicon-share:before {\n  content: \"\\E066\"; }\n\n.glyphicon-check:before {\n  content: \"\\E067\"; }\n\n.glyphicon-move:before {\n  content: \"\\E068\"; }\n\n.glyphicon-step-backward:before {\n  content: \"\\E069\"; }\n\n.glyphicon-fast-backward:before {\n  content: \"\\E070\"; }\n\n.glyphicon-backward:before {\n  content: \"\\E071\"; }\n\n.glyphicon-play:before {\n  content: \"\\E072\"; }\n\n.glyphicon-pause:before {\n  content: \"\\E073\"; }\n\n.glyphicon-stop:before {\n  content: \"\\E074\"; }\n\n.glyphicon-forward:before {\n  content: \"\\E075\"; }\n\n.glyphicon-fast-forward:before {\n  content: \"\\E076\"; }\n\n.glyphicon-step-forward:before {\n  content: \"\\E077\"; }\n\n.glyphicon-eject:before {\n  content: \"\\E078\"; }\n\n.glyphicon-chevron-left:before {\n  content: \"\\E079\"; }\n\n.glyphicon-chevron-right:before {\n  content: \"\\E080\"; }\n\n.glyphicon-plus-sign:before {\n  content: \"\\E081\"; }\n\n.glyphicon-minus-sign:before {\n  content: \"\\E082\"; }\n\n.glyphicon-remove-sign:before {\n  content: \"\\E083\"; }\n\n.glyphicon-ok-sign:before {\n  content: \"\\E084\"; }\n\n.glyphicon-question-sign:before {\n  content: \"\\E085\"; }\n\n.glyphicon-info-sign:before {\n  content: \"\\E086\"; }\n\n.glyphicon-screenshot:before {\n  content: \"\\E087\"; }\n\n.glyphicon-remove-circle:before {\n  content: \"\\E088\"; }\n\n.glyphicon-ok-circle:before {\n  content: \"\\E089\"; }\n\n.glyphicon-ban-circle:before {\n  content: \"\\E090\"; }\n\n.glyphicon-arrow-left:before {\n  content: \"\\E091\"; }\n\n.glyphicon-arrow-right:before {\n  content: \"\\E092\"; }\n\n.glyphicon-arrow-up:before {\n  content: \"\\E093\"; }\n\n.glyphicon-arrow-down:before {\n  content: \"\\E094\"; }\n\n.glyphicon-share-alt:before {\n  content: \"\\E095\"; }\n\n.glyphicon-resize-full:before {\n  content: \"\\E096\"; }\n\n.glyphicon-resize-small:before {\n  content: \"\\E097\"; }\n\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\"; }\n\n.glyphicon-gift:before {\n  content: \"\\E102\"; }\n\n.glyphicon-leaf:before {\n  content: \"\\E103\"; }\n\n.glyphicon-fire:before {\n  content: \"\\E104\"; }\n\n.glyphicon-eye-open:before {\n  content: \"\\E105\"; }\n\n.glyphicon-eye-close:before {\n  content: \"\\E106\"; }\n\n.glyphicon-warning-sign:before {\n  content: \"\\E107\"; }\n\n.glyphicon-plane:before {\n  content: \"\\E108\"; }\n\n.glyphicon-calendar:before {\n  content: \"\\E109\"; }\n\n.glyphicon-random:before {\n  content: \"\\E110\"; }\n\n.glyphicon-comment:before {\n  content: \"\\E111\"; }\n\n.glyphicon-magnet:before {\n  content: \"\\E112\"; }\n\n.glyphicon-chevron-up:before {\n  content: \"\\E113\"; }\n\n.glyphicon-chevron-down:before {\n  content: \"\\E114\"; }\n\n.glyphicon-retweet:before {\n  content: \"\\E115\"; }\n\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\"; }\n\n.glyphicon-folder-close:before {\n  content: \"\\E117\"; }\n\n.glyphicon-folder-open:before {\n  content: \"\\E118\"; }\n\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\"; }\n\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\"; }\n\n.glyphicon-hdd:before {\n  content: \"\\E121\"; }\n\n.glyphicon-bullhorn:before {\n  content: \"\\E122\"; }\n\n.glyphicon-bell:before {\n  content: \"\\E123\"; }\n\n.glyphicon-certificate:before {\n  content: \"\\E124\"; }\n\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\"; }\n\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\"; }\n\n.glyphicon-hand-right:before {\n  content: \"\\E127\"; }\n\n.glyphicon-hand-left:before {\n  content: \"\\E128\"; }\n\n.glyphicon-hand-up:before {\n  content: \"\\E129\"; }\n\n.glyphicon-hand-down:before {\n  content: \"\\E130\"; }\n\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\"; }\n\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\"; }\n\n.glyphicon-circle-arrow-up:before {\n  content: \"\\E133\"; }\n\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\"; }\n\n.glyphicon-globe:before {\n  content: \"\\E135\"; }\n\n.glyphicon-wrench:before {\n  content: \"\\E136\"; }\n\n.glyphicon-tasks:before {\n  content: \"\\E137\"; }\n\n.glyphicon-filter:before {\n  content: \"\\E138\"; }\n\n.glyphicon-briefcase:before {\n  content: \"\\E139\"; }\n\n.glyphicon-fullscreen:before {\n  content: \"\\E140\"; }\n\n.glyphicon-dashboard:before {\n  content: \"\\E141\"; }\n\n.glyphicon-paperclip:before {\n  content: \"\\E142\"; }\n\n.glyphicon-heart-empty:before {\n  content: \"\\E143\"; }\n\n.glyphicon-link:before {\n  content: \"\\E144\"; }\n\n.glyphicon-phone:before {\n  content: \"\\E145\"; }\n\n.glyphicon-pushpin:before {\n  content: \"\\E146\"; }\n\n.glyphicon-usd:before {\n  content: \"\\E148\"; }\n\n.glyphicon-gbp:before {\n  content: \"\\E149\"; }\n\n.glyphicon-sort:before {\n  content: \"\\E150\"; }\n\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\"; }\n\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\"; }\n\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\"; }\n\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\"; }\n\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\"; }\n\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\"; }\n\n.glyphicon-unchecked:before {\n  content: \"\\E157\"; }\n\n.glyphicon-expand:before {\n  content: \"\\E158\"; }\n\n.glyphicon-collapse-down:before {\n  content: \"\\E159\"; }\n\n.glyphicon-collapse-up:before {\n  content: \"\\E160\"; }\n\n.glyphicon-log-in:before {\n  content: \"\\E161\"; }\n\n.glyphicon-flash:before {\n  content: \"\\E162\"; }\n\n.glyphicon-log-out:before {\n  content: \"\\E163\"; }\n\n.glyphicon-new-window:before {\n  content: \"\\E164\"; }\n\n.glyphicon-record:before {\n  content: \"\\E165\"; }\n\n.glyphicon-save:before {\n  content: \"\\E166\"; }\n\n.glyphicon-open:before {\n  content: \"\\E167\"; }\n\n.glyphicon-saved:before {\n  content: \"\\E168\"; }\n\n.glyphicon-import:before {\n  content: \"\\E169\"; }\n\n.glyphicon-export:before {\n  content: \"\\E170\"; }\n\n.glyphicon-send:before {\n  content: \"\\E171\"; }\n\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\"; }\n\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\"; }\n\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\"; }\n\n.glyphicon-floppy-save:before {\n  content: \"\\E175\"; }\n\n.glyphicon-floppy-open:before {\n  content: \"\\E176\"; }\n\n.glyphicon-credit-card:before {\n  content: \"\\E177\"; }\n\n.glyphicon-transfer:before {\n  content: \"\\E178\"; }\n\n.glyphicon-cutlery:before {\n  content: \"\\E179\"; }\n\n.glyphicon-header:before {\n  content: \"\\E180\"; }\n\n.glyphicon-compressed:before {\n  content: \"\\E181\"; }\n\n.glyphicon-earphone:before {\n  content: \"\\E182\"; }\n\n.glyphicon-phone-alt:before {\n  content: \"\\E183\"; }\n\n.glyphicon-tower:before {\n  content: \"\\E184\"; }\n\n.glyphicon-stats:before {\n  content: \"\\E185\"; }\n\n.glyphicon-sd-video:before {\n  content: \"\\E186\"; }\n\n.glyphicon-hd-video:before {\n  content: \"\\E187\"; }\n\n.glyphicon-subtitles:before {\n  content: \"\\E188\"; }\n\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\"; }\n\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\"; }\n\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\"; }\n\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\"; }\n\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\"; }\n\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\"; }\n\n.glyphicon-registration-mark:before {\n  content: \"\\E195\"; }\n\n.glyphicon-cloud-download:before {\n  content: \"\\E197\"; }\n\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\"; }\n\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\"; }\n\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\"; }\n\n.glyphicon-cd:before {\n  content: \"\\E201\"; }\n\n.glyphicon-save-file:before {\n  content: \"\\E202\"; }\n\n.glyphicon-open-file:before {\n  content: \"\\E203\"; }\n\n.glyphicon-level-up:before {\n  content: \"\\E204\"; }\n\n.glyphicon-copy:before {\n  content: \"\\E205\"; }\n\n.glyphicon-paste:before {\n  content: \"\\E206\"; }\n\n.glyphicon-alert:before {\n  content: \"\\E209\"; }\n\n.glyphicon-equalizer:before {\n  content: \"\\E210\"; }\n\n.glyphicon-king:before {\n  content: \"\\E211\"; }\n\n.glyphicon-queen:before {\n  content: \"\\E212\"; }\n\n.glyphicon-pawn:before {\n  content: \"\\E213\"; }\n\n.glyphicon-bishop:before {\n  content: \"\\E214\"; }\n\n.glyphicon-knight:before {\n  content: \"\\E215\"; }\n\n.glyphicon-baby-formula:before {\n  content: \"\\E216\"; }\n\n.glyphicon-tent:before {\n  content: \"\\26FA\"; }\n\n.glyphicon-blackboard:before {\n  content: \"\\E218\"; }\n\n.glyphicon-bed:before {\n  content: \"\\E219\"; }\n\n.glyphicon-apple:before {\n  content: \"\\F8FF\"; }\n\n.glyphicon-erase:before {\n  content: \"\\E221\"; }\n\n.glyphicon-hourglass:before {\n  content: \"\\231B\"; }\n\n.glyphicon-lamp:before {\n  content: \"\\E223\"; }\n\n.glyphicon-duplicate:before {\n  content: \"\\E224\"; }\n\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\"; }\n\n.glyphicon-scissors:before {\n  content: \"\\E226\"; }\n\n.glyphicon-bitcoin:before {\n  content: \"\\E227\"; }\n\n.glyphicon-btc:before {\n  content: \"\\E227\"; }\n\n.glyphicon-xbt:before {\n  content: \"\\E227\"; }\n\n.glyphicon-yen:before {\n  content: \"\\A5\"; }\n\n.glyphicon-jpy:before {\n  content: \"\\A5\"; }\n\n.glyphicon-ruble:before {\n  content: \"\\20BD\"; }\n\n.glyphicon-rub:before {\n  content: \"\\20BD\"; }\n\n.glyphicon-scale:before {\n  content: \"\\E230\"; }\n\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\"; }\n\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\"; }\n\n.glyphicon-education:before {\n  content: \"\\E233\"; }\n\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\"; }\n\n.glyphicon-option-vertical:before {\n  content: \"\\E235\"; }\n\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\"; }\n\n.glyphicon-modal-window:before {\n  content: \"\\E237\"; }\n\n.glyphicon-oil:before {\n  content: \"\\E238\"; }\n\n.glyphicon-grain:before {\n  content: \"\\E239\"; }\n\n.glyphicon-sunglasses:before {\n  content: \"\\E240\"; }\n\n.glyphicon-text-size:before {\n  content: \"\\E241\"; }\n\n.glyphicon-text-color:before {\n  content: \"\\E242\"; }\n\n.glyphicon-text-background:before {\n  content: \"\\E243\"; }\n\n.glyphicon-object-align-top:before {\n  content: \"\\E244\"; }\n\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\"; }\n\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\"; }\n\n.glyphicon-object-align-left:before {\n  content: \"\\E247\"; }\n\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\"; }\n\n.glyphicon-object-align-right:before {\n  content: \"\\E249\"; }\n\n.glyphicon-triangle-right:before {\n  content: \"\\E250\"; }\n\n.glyphicon-triangle-left:before {\n  content: \"\\E251\"; }\n\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\"; }\n\n.glyphicon-triangle-top:before {\n  content: \"\\E253\"; }\n\n.glyphicon-console:before {\n  content: \"\\E254\"; }\n\n.glyphicon-superscript:before {\n  content: \"\\E255\"; }\n\n.glyphicon-subscript:before {\n  content: \"\\E256\"; }\n\n.glyphicon-menu-left:before {\n  content: \"\\E257\"; }\n\n.glyphicon-menu-right:before {\n  content: \"\\E258\"; }\n\n.glyphicon-menu-down:before {\n  content: \"\\E259\"; }\n\n.glyphicon-menu-up:before {\n  content: \"\\E260\"; }\n\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #333333;\n  background-color: #fff; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\na {\n  color: #337ab7;\n  text-decoration: none; }\n  a:hover, a:focus {\n    color: #23527c;\n    text-decoration: underline; }\n  a:focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\nfigure {\n  margin: 0; }\n\nimg {\n  vertical-align: middle; }\n\n.img-responsive {\n  display: block;\n  max-width: 100%;\n  height: auto; }\n\n.img-rounded {\n  border-radius: 6px; }\n\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto; }\n\n.img-circle {\n  border-radius: 50%; }\n\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n  h1 small,\n  h1 .small, h2 small,\n  h2 .small, h3 small,\n  h3 .small, h4 small,\n  h4 .small, h5 small,\n  h5 .small, h6 small,\n  h6 .small,\n  .h1 small,\n  .h1 .small, .h2 small,\n  .h2 .small, .h3 small,\n  .h3 .small, .h4 small,\n  .h4 .small, .h5 small,\n  .h5 .small, .h6 small,\n  .h6 .small {\n    font-weight: normal;\n    line-height: 1;\n    color: #777777; }\n\nh1, .h1,\nh2, .h2,\nh3, .h3 {\n  margin-top: 20px;\n  margin-bottom: 10px; }\n  h1 small,\n  h1 .small, .h1 small,\n  .h1 .small,\n  h2 small,\n  h2 .small, .h2 small,\n  .h2 .small,\n  h3 small,\n  h3 .small, .h3 small,\n  .h3 .small {\n    font-size: 65%; }\n\nh4, .h4,\nh5, .h5,\nh6, .h6 {\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  h4 small,\n  h4 .small, .h4 small,\n  .h4 .small,\n  h5 small,\n  h5 .small, .h5 small,\n  .h5 .small,\n  h6 small,\n  h6 .small, .h6 small,\n  .h6 .small {\n    font-size: 75%; }\n\nh1, .h1 {\n  font-size: 36px; }\n\nh2, .h2 {\n  font-size: 30px; }\n\nh3, .h3 {\n  font-size: 24px; }\n\nh4, .h4 {\n  font-size: 18px; }\n\nh5, .h5 {\n  font-size: 14px; }\n\nh6, .h6 {\n  font-size: 12px; }\n\np {\n  margin: 0 0 10px; }\n\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4; }\n  @media (min-width: 768px) {\n    .lead {\n      font-size: 21px; } }\n\nsmall,\n.small {\n  font-size: 85%; }\n\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em; }\n\n.text-left {\n  text-align: left; }\n\n.text-right {\n  text-align: right; }\n\n.text-center {\n  text-align: center; }\n\n.text-justify {\n  text-align: justify; }\n\n.text-nowrap {\n  white-space: nowrap; }\n\n.text-lowercase {\n  text-transform: lowercase; }\n\n.text-uppercase, .initialism {\n  text-transform: uppercase; }\n\n.text-capitalize {\n  text-transform: capitalize; }\n\n.text-muted {\n  color: #777777; }\n\n.text-primary {\n  color: #337ab7; }\n\na.text-primary:hover,\na.text-primary:focus {\n  color: #286090; }\n\n.text-success {\n  color: #3c763d; }\n\na.text-success:hover,\na.text-success:focus {\n  color: #2b542c; }\n\n.text-info {\n  color: #31708f; }\n\na.text-info:hover,\na.text-info:focus {\n  color: #245269; }\n\n.text-warning {\n  color: #8a6d3b; }\n\na.text-warning:hover,\na.text-warning:focus {\n  color: #66512c; }\n\n.text-danger {\n  color: #a94442; }\n\na.text-danger:hover,\na.text-danger:focus {\n  color: #843534; }\n\n.bg-primary {\n  color: #fff; }\n\n.bg-primary {\n  background-color: #337ab7; }\n\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #286090; }\n\n.bg-success {\n  background-color: #dff0d8; }\n\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3; }\n\n.bg-info {\n  background-color: #d9edf7; }\n\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee; }\n\n.bg-warning {\n  background-color: #fcf8e3; }\n\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5; }\n\n.bg-danger {\n  background-color: #f2dede; }\n\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9; }\n\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee; }\n\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px; }\n  ul ul,\n  ul ol,\n  ol ul,\n  ol ol {\n    margin-bottom: 0; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n  margin-left: -5px; }\n  .list-inline > li {\n    display: inline-block;\n    padding-left: 5px;\n    padding-right: 5px; }\n\ndl {\n  margin-top: 0;\n  margin-bottom: 20px; }\n\ndt,\ndd {\n  line-height: 1.42857; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-left: 0; }\n\n.dl-horizontal dd:before, .dl-horizontal dd:after {\n  content: \" \";\n  display: table; }\n\n.dl-horizontal dd:after {\n  clear: both; }\n\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .dl-horizontal dd {\n    margin-left: 180px; } }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777777; }\n\n.initialism {\n  font-size: 90%; }\n\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eeeeee; }\n  blockquote p:last-child,\n  blockquote ul:last-child,\n  blockquote ol:last-child {\n    margin-bottom: 0; }\n  blockquote footer,\n  blockquote small,\n  blockquote .small {\n    display: block;\n    font-size: 80%;\n    line-height: 1.42857;\n    color: #777777; }\n    blockquote footer:before,\n    blockquote small:before,\n    blockquote .small:before {\n      content: '\\2014   \\A0'; }\n\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n  text-align: right; }\n  .blockquote-reverse footer:before,\n  .blockquote-reverse small:before,\n  .blockquote-reverse .small:before,\n  blockquote.pull-right footer:before,\n  blockquote.pull-right small:before,\n  blockquote.pull-right .small:before {\n    content: ''; }\n  .blockquote-reverse footer:after,\n  .blockquote-reverse small:after,\n  .blockquote-reverse .small:after,\n  blockquote.pull-right footer:after,\n  blockquote.pull-right small:after,\n  blockquote.pull-right .small:after {\n    content: '\\A0   \\2014'; }\n\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace; }\n\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px; }\n\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25); }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold;\n    box-shadow: none; }\n\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    white-space: pre-wrap;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container:before, .container:after {\n    content: \" \";\n    display: table; }\n  .container:after {\n    clear: both; }\n  @media (min-width: 768px) {\n    .container {\n      width: 750px; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 970px; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1170px; } }\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container-fluid:before, .container-fluid:after {\n    content: \" \";\n    display: table; }\n  .container-fluid:after {\n    clear: both; }\n\n.row {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .row:before, .row:after {\n    content: \" \";\n    display: table; }\n  .row:after {\n    clear: both; }\n\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left; }\n\n.col-xs-1 {\n  width: 8.33333%; }\n\n.col-xs-2 {\n  width: 16.66667%; }\n\n.col-xs-3 {\n  width: 25%; }\n\n.col-xs-4 {\n  width: 33.33333%; }\n\n.col-xs-5 {\n  width: 41.66667%; }\n\n.col-xs-6 {\n  width: 50%; }\n\n.col-xs-7 {\n  width: 58.33333%; }\n\n.col-xs-8 {\n  width: 66.66667%; }\n\n.col-xs-9 {\n  width: 75%; }\n\n.col-xs-10 {\n  width: 83.33333%; }\n\n.col-xs-11 {\n  width: 91.66667%; }\n\n.col-xs-12 {\n  width: 100%; }\n\n.col-xs-pull-0 {\n  right: auto; }\n\n.col-xs-pull-1 {\n  right: 8.33333%; }\n\n.col-xs-pull-2 {\n  right: 16.66667%; }\n\n.col-xs-pull-3 {\n  right: 25%; }\n\n.col-xs-pull-4 {\n  right: 33.33333%; }\n\n.col-xs-pull-5 {\n  right: 41.66667%; }\n\n.col-xs-pull-6 {\n  right: 50%; }\n\n.col-xs-pull-7 {\n  right: 58.33333%; }\n\n.col-xs-pull-8 {\n  right: 66.66667%; }\n\n.col-xs-pull-9 {\n  right: 75%; }\n\n.col-xs-pull-10 {\n  right: 83.33333%; }\n\n.col-xs-pull-11 {\n  right: 91.66667%; }\n\n.col-xs-pull-12 {\n  right: 100%; }\n\n.col-xs-push-0 {\n  left: auto; }\n\n.col-xs-push-1 {\n  left: 8.33333%; }\n\n.col-xs-push-2 {\n  left: 16.66667%; }\n\n.col-xs-push-3 {\n  left: 25%; }\n\n.col-xs-push-4 {\n  left: 33.33333%; }\n\n.col-xs-push-5 {\n  left: 41.66667%; }\n\n.col-xs-push-6 {\n  left: 50%; }\n\n.col-xs-push-7 {\n  left: 58.33333%; }\n\n.col-xs-push-8 {\n  left: 66.66667%; }\n\n.col-xs-push-9 {\n  left: 75%; }\n\n.col-xs-push-10 {\n  left: 83.33333%; }\n\n.col-xs-push-11 {\n  left: 91.66667%; }\n\n.col-xs-push-12 {\n  left: 100%; }\n\n.col-xs-offset-0 {\n  margin-left: 0%; }\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%; }\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%; }\n\n.col-xs-offset-3 {\n  margin-left: 25%; }\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%; }\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%; }\n\n.col-xs-offset-6 {\n  margin-left: 50%; }\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%; }\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%; }\n\n.col-xs-offset-9 {\n  margin-left: 75%; }\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%; }\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%; }\n\n.col-xs-offset-12 {\n  margin-left: 100%; }\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left; }\n  .col-sm-1 {\n    width: 8.33333%; }\n  .col-sm-2 {\n    width: 16.66667%; }\n  .col-sm-3 {\n    width: 25%; }\n  .col-sm-4 {\n    width: 33.33333%; }\n  .col-sm-5 {\n    width: 41.66667%; }\n  .col-sm-6 {\n    width: 50%; }\n  .col-sm-7 {\n    width: 58.33333%; }\n  .col-sm-8 {\n    width: 66.66667%; }\n  .col-sm-9 {\n    width: 75%; }\n  .col-sm-10 {\n    width: 83.33333%; }\n  .col-sm-11 {\n    width: 91.66667%; }\n  .col-sm-12 {\n    width: 100%; }\n  .col-sm-pull-0 {\n    right: auto; }\n  .col-sm-pull-1 {\n    right: 8.33333%; }\n  .col-sm-pull-2 {\n    right: 16.66667%; }\n  .col-sm-pull-3 {\n    right: 25%; }\n  .col-sm-pull-4 {\n    right: 33.33333%; }\n  .col-sm-pull-5 {\n    right: 41.66667%; }\n  .col-sm-pull-6 {\n    right: 50%; }\n  .col-sm-pull-7 {\n    right: 58.33333%; }\n  .col-sm-pull-8 {\n    right: 66.66667%; }\n  .col-sm-pull-9 {\n    right: 75%; }\n  .col-sm-pull-10 {\n    right: 83.33333%; }\n  .col-sm-pull-11 {\n    right: 91.66667%; }\n  .col-sm-pull-12 {\n    right: 100%; }\n  .col-sm-push-0 {\n    left: auto; }\n  .col-sm-push-1 {\n    left: 8.33333%; }\n  .col-sm-push-2 {\n    left: 16.66667%; }\n  .col-sm-push-3 {\n    left: 25%; }\n  .col-sm-push-4 {\n    left: 33.33333%; }\n  .col-sm-push-5 {\n    left: 41.66667%; }\n  .col-sm-push-6 {\n    left: 50%; }\n  .col-sm-push-7 {\n    left: 58.33333%; }\n  .col-sm-push-8 {\n    left: 66.66667%; }\n  .col-sm-push-9 {\n    left: 75%; }\n  .col-sm-push-10 {\n    left: 83.33333%; }\n  .col-sm-push-11 {\n    left: 91.66667%; }\n  .col-sm-push-12 {\n    left: 100%; }\n  .col-sm-offset-0 {\n    margin-left: 0%; }\n  .col-sm-offset-1 {\n    margin-left: 8.33333%; }\n  .col-sm-offset-2 {\n    margin-left: 16.66667%; }\n  .col-sm-offset-3 {\n    margin-left: 25%; }\n  .col-sm-offset-4 {\n    margin-left: 33.33333%; }\n  .col-sm-offset-5 {\n    margin-left: 41.66667%; }\n  .col-sm-offset-6 {\n    margin-left: 50%; }\n  .col-sm-offset-7 {\n    margin-left: 58.33333%; }\n  .col-sm-offset-8 {\n    margin-left: 66.66667%; }\n  .col-sm-offset-9 {\n    margin-left: 75%; }\n  .col-sm-offset-10 {\n    margin-left: 83.33333%; }\n  .col-sm-offset-11 {\n    margin-left: 91.66667%; }\n  .col-sm-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left; }\n  .col-md-1 {\n    width: 8.33333%; }\n  .col-md-2 {\n    width: 16.66667%; }\n  .col-md-3 {\n    width: 25%; }\n  .col-md-4 {\n    width: 33.33333%; }\n  .col-md-5 {\n    width: 41.66667%; }\n  .col-md-6 {\n    width: 50%; }\n  .col-md-7 {\n    width: 58.33333%; }\n  .col-md-8 {\n    width: 66.66667%; }\n  .col-md-9 {\n    width: 75%; }\n  .col-md-10 {\n    width: 83.33333%; }\n  .col-md-11 {\n    width: 91.66667%; }\n  .col-md-12 {\n    width: 100%; }\n  .col-md-pull-0 {\n    right: auto; }\n  .col-md-pull-1 {\n    right: 8.33333%; }\n  .col-md-pull-2 {\n    right: 16.66667%; }\n  .col-md-pull-3 {\n    right: 25%; }\n  .col-md-pull-4 {\n    right: 33.33333%; }\n  .col-md-pull-5 {\n    right: 41.66667%; }\n  .col-md-pull-6 {\n    right: 50%; }\n  .col-md-pull-7 {\n    right: 58.33333%; }\n  .col-md-pull-8 {\n    right: 66.66667%; }\n  .col-md-pull-9 {\n    right: 75%; }\n  .col-md-pull-10 {\n    right: 83.33333%; }\n  .col-md-pull-11 {\n    right: 91.66667%; }\n  .col-md-pull-12 {\n    right: 100%; }\n  .col-md-push-0 {\n    left: auto; }\n  .col-md-push-1 {\n    left: 8.33333%; }\n  .col-md-push-2 {\n    left: 16.66667%; }\n  .col-md-push-3 {\n    left: 25%; }\n  .col-md-push-4 {\n    left: 33.33333%; }\n  .col-md-push-5 {\n    left: 41.66667%; }\n  .col-md-push-6 {\n    left: 50%; }\n  .col-md-push-7 {\n    left: 58.33333%; }\n  .col-md-push-8 {\n    left: 66.66667%; }\n  .col-md-push-9 {\n    left: 75%; }\n  .col-md-push-10 {\n    left: 83.33333%; }\n  .col-md-push-11 {\n    left: 91.66667%; }\n  .col-md-push-12 {\n    left: 100%; }\n  .col-md-offset-0 {\n    margin-left: 0%; }\n  .col-md-offset-1 {\n    margin-left: 8.33333%; }\n  .col-md-offset-2 {\n    margin-left: 16.66667%; }\n  .col-md-offset-3 {\n    margin-left: 25%; }\n  .col-md-offset-4 {\n    margin-left: 33.33333%; }\n  .col-md-offset-5 {\n    margin-left: 41.66667%; }\n  .col-md-offset-6 {\n    margin-left: 50%; }\n  .col-md-offset-7 {\n    margin-left: 58.33333%; }\n  .col-md-offset-8 {\n    margin-left: 66.66667%; }\n  .col-md-offset-9 {\n    margin-left: 75%; }\n  .col-md-offset-10 {\n    margin-left: 83.33333%; }\n  .col-md-offset-11 {\n    margin-left: 91.66667%; }\n  .col-md-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left; }\n  .col-lg-1 {\n    width: 8.33333%; }\n  .col-lg-2 {\n    width: 16.66667%; }\n  .col-lg-3 {\n    width: 25%; }\n  .col-lg-4 {\n    width: 33.33333%; }\n  .col-lg-5 {\n    width: 41.66667%; }\n  .col-lg-6 {\n    width: 50%; }\n  .col-lg-7 {\n    width: 58.33333%; }\n  .col-lg-8 {\n    width: 66.66667%; }\n  .col-lg-9 {\n    width: 75%; }\n  .col-lg-10 {\n    width: 83.33333%; }\n  .col-lg-11 {\n    width: 91.66667%; }\n  .col-lg-12 {\n    width: 100%; }\n  .col-lg-pull-0 {\n    right: auto; }\n  .col-lg-pull-1 {\n    right: 8.33333%; }\n  .col-lg-pull-2 {\n    right: 16.66667%; }\n  .col-lg-pull-3 {\n    right: 25%; }\n  .col-lg-pull-4 {\n    right: 33.33333%; }\n  .col-lg-pull-5 {\n    right: 41.66667%; }\n  .col-lg-pull-6 {\n    right: 50%; }\n  .col-lg-pull-7 {\n    right: 58.33333%; }\n  .col-lg-pull-8 {\n    right: 66.66667%; }\n  .col-lg-pull-9 {\n    right: 75%; }\n  .col-lg-pull-10 {\n    right: 83.33333%; }\n  .col-lg-pull-11 {\n    right: 91.66667%; }\n  .col-lg-pull-12 {\n    right: 100%; }\n  .col-lg-push-0 {\n    left: auto; }\n  .col-lg-push-1 {\n    left: 8.33333%; }\n  .col-lg-push-2 {\n    left: 16.66667%; }\n  .col-lg-push-3 {\n    left: 25%; }\n  .col-lg-push-4 {\n    left: 33.33333%; }\n  .col-lg-push-5 {\n    left: 41.66667%; }\n  .col-lg-push-6 {\n    left: 50%; }\n  .col-lg-push-7 {\n    left: 58.33333%; }\n  .col-lg-push-8 {\n    left: 66.66667%; }\n  .col-lg-push-9 {\n    left: 75%; }\n  .col-lg-push-10 {\n    left: 83.33333%; }\n  .col-lg-push-11 {\n    left: 91.66667%; }\n  .col-lg-push-12 {\n    left: 100%; }\n  .col-lg-offset-0 {\n    margin-left: 0%; }\n  .col-lg-offset-1 {\n    margin-left: 8.33333%; }\n  .col-lg-offset-2 {\n    margin-left: 16.66667%; }\n  .col-lg-offset-3 {\n    margin-left: 25%; }\n  .col-lg-offset-4 {\n    margin-left: 33.33333%; }\n  .col-lg-offset-5 {\n    margin-left: 41.66667%; }\n  .col-lg-offset-6 {\n    margin-left: 50%; }\n  .col-lg-offset-7 {\n    margin-left: 58.33333%; }\n  .col-lg-offset-8 {\n    margin-left: 66.66667%; }\n  .col-lg-offset-9 {\n    margin-left: 75%; }\n  .col-lg-offset-10 {\n    margin-left: 83.33333%; }\n  .col-lg-offset-11 {\n    margin-left: 91.66667%; }\n  .col-lg-offset-12 {\n    margin-left: 100%; } }\n\ntable {\n  background-color: transparent; }\n\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #777777;\n  text-align: left; }\n\nth {\n  text-align: left; }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px; }\n  .table > thead > tr > th,\n  .table > thead > tr > td,\n  .table > tbody > tr > th,\n  .table > tbody > tr > td,\n  .table > tfoot > tr > th,\n  .table > tfoot > tr > td {\n    padding: 8px;\n    line-height: 1.42857;\n    vertical-align: top;\n    border-top: 1px solid #ddd; }\n  .table > thead > tr > th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #ddd; }\n  .table > caption + thead > tr:first-child > th,\n  .table > caption + thead > tr:first-child > td,\n  .table > colgroup + thead > tr:first-child > th,\n  .table > colgroup + thead > tr:first-child > td,\n  .table > thead:first-child > tr:first-child > th,\n  .table > thead:first-child > tr:first-child > td {\n    border-top: 0; }\n  .table > tbody + tbody {\n    border-top: 2px solid #ddd; }\n  .table .table {\n    background-color: #fff; }\n\n.table-condensed > thead > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > th,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > th,\n.table-condensed > tfoot > tr > td {\n  padding: 5px; }\n\n.table-bordered {\n  border: 1px solid #ddd; }\n  .table-bordered > thead > tr > th,\n  .table-bordered > thead > tr > td,\n  .table-bordered > tbody > tr > th,\n  .table-bordered > tbody > tr > td,\n  .table-bordered > tfoot > tr > th,\n  .table-bordered > tfoot > tr > td {\n    border: 1px solid #ddd; }\n  .table-bordered > thead > tr > th,\n  .table-bordered > thead > tr > td {\n    border-bottom-width: 2px; }\n\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9; }\n\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5; }\n\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column; }\n\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell; }\n\n.table > thead > tr > td.active,\n.table > thead > tr > th.active,\n.table > thead > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr > td.active,\n.table > tbody > tr > th.active,\n.table > tbody > tr.active > td,\n.table > tbody > tr.active > th,\n.table > tfoot > tr > td.active,\n.table > tfoot > tr > th.active,\n.table > tfoot > tr.active > td,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5; }\n\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8; }\n\n.table > thead > tr > td.success,\n.table > thead > tr > th.success,\n.table > thead > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr > td.success,\n.table > tbody > tr > th.success,\n.table > tbody > tr.success > td,\n.table > tbody > tr.success > th,\n.table > tfoot > tr > td.success,\n.table > tfoot > tr > th.success,\n.table > tfoot > tr.success > td,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8; }\n\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6; }\n\n.table > thead > tr > td.info,\n.table > thead > tr > th.info,\n.table > thead > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr > td.info,\n.table > tbody > tr > th.info,\n.table > tbody > tr.info > td,\n.table > tbody > tr.info > th,\n.table > tfoot > tr > td.info,\n.table > tfoot > tr > th.info,\n.table > tfoot > tr.info > td,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7; }\n\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3; }\n\n.table > thead > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr > td.warning,\n.table > tbody > tr > th.warning,\n.table > tbody > tr.warning > td,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr > td.warning,\n.table > tfoot > tr > th.warning,\n.table > tfoot > tr.warning > td,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3; }\n\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc; }\n\n.table > thead > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr > td.danger,\n.table > tbody > tr > th.danger,\n.table > tbody > tr.danger > td,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr > td.danger,\n.table > tfoot > tr > th.danger,\n.table > tfoot > tr.danger > td,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede; }\n\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc; }\n\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%; }\n  @media screen and (max-width: 767px) {\n    .table-responsive {\n      width: 100%;\n      margin-bottom: 15px;\n      overflow-y: hidden;\n      -ms-overflow-style: -ms-autohiding-scrollbar;\n      border: 1px solid #ddd; }\n      .table-responsive > .table {\n        margin-bottom: 0; }\n        .table-responsive > .table > thead > tr > th,\n        .table-responsive > .table > thead > tr > td,\n        .table-responsive > .table > tbody > tr > th,\n        .table-responsive > .table > tbody > tr > td,\n        .table-responsive > .table > tfoot > tr > th,\n        .table-responsive > .table > tfoot > tr > td {\n          white-space: nowrap; }\n      .table-responsive > .table-bordered {\n        border: 0; }\n        .table-responsive > .table-bordered > thead > tr > th:first-child,\n        .table-responsive > .table-bordered > thead > tr > td:first-child,\n        .table-responsive > .table-bordered > tbody > tr > th:first-child,\n        .table-responsive > .table-bordered > tbody > tr > td:first-child,\n        .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n        .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n          border-left: 0; }\n        .table-responsive > .table-bordered > thead > tr > th:last-child,\n        .table-responsive > .table-bordered > thead > tr > td:last-child,\n        .table-responsive > .table-bordered > tbody > tr > th:last-child,\n        .table-responsive > .table-bordered > tbody > tr > td:last-child,\n        .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n        .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n          border-right: 0; }\n        .table-responsive > .table-bordered > tbody > tr:last-child > th,\n        .table-responsive > .table-bordered > tbody > tr:last-child > td,\n        .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n        .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n          border-bottom: 0; } }\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5; }\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold; }\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal; }\n\ninput[type=\"file\"] {\n  display: block; }\n\ninput[type=\"range\"] {\n  display: block;\n  width: 100%; }\n\nselect[multiple],\nselect[size] {\n  height: auto; }\n\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control:focus {\n    border-color: #66afe9;\n    outline: 0;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); }\n  .form-control::-moz-placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder {\n    color: #999; }\n  .form-control::-webkit-input-placeholder {\n    color: #999; }\n  .form-control::-ms-expand {\n    border: 0;\n    background-color: transparent; }\n  .form-control[disabled], .form-control[readonly],\n  fieldset[disabled] .form-control {\n    background-color: #eeeeee;\n    opacity: 1; }\n  .form-control[disabled],\n  fieldset[disabled] .form-control {\n    cursor: not-allowed; }\n\ntextarea.form-control {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px; }\n  input[type=\"date\"].input-sm, .input-group-sm > input[type=\"date\"].form-control,\n  .input-group-sm > input[type=\"date\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-sm input[type=\"date\"],\n  input[type=\"time\"].input-sm,\n  .input-group-sm > input[type=\"time\"].form-control,\n  .input-group-sm > input[type=\"time\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-sm\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-sm,\n  .input-group-sm > input[type=\"datetime-local\"].form-control,\n  .input-group-sm > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-sm\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-sm,\n  .input-group-sm > input[type=\"month\"].form-control,\n  .input-group-sm > input[type=\"month\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-sm\n  input[type=\"month\"] {\n    line-height: 30px; }\n  input[type=\"date\"].input-lg, .input-group-lg > input[type=\"date\"].form-control,\n  .input-group-lg > input[type=\"date\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-lg input[type=\"date\"],\n  input[type=\"time\"].input-lg,\n  .input-group-lg > input[type=\"time\"].form-control,\n  .input-group-lg > input[type=\"time\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-lg\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-lg,\n  .input-group-lg > input[type=\"datetime-local\"].form-control,\n  .input-group-lg > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-lg\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-lg,\n  .input-group-lg > input[type=\"month\"].form-control,\n  .input-group-lg > input[type=\"month\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-lg\n  input[type=\"month\"] {\n    line-height: 46px; } }\n\n.form-group {\n  margin-bottom: 15px; }\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  .radio label,\n  .checkbox label {\n    min-height: 20px;\n    padding-left: 20px;\n    margin-bottom: 0;\n    font-weight: normal;\n    cursor: pointer; }\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9; }\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px; }\n\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer; }\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px; }\n\ninput[type=\"radio\"][disabled], input[type=\"radio\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled]\ninput[type=\"checkbox\"] {\n  cursor: not-allowed; }\n\n.radio-inline.disabled,\nfieldset[disabled] .radio-inline,\n.checkbox-inline.disabled,\nfieldset[disabled]\n.checkbox-inline {\n  cursor: not-allowed; }\n\n.radio.disabled label,\nfieldset[disabled] .radio label,\n.checkbox.disabled label,\nfieldset[disabled]\n.checkbox label {\n  cursor: not-allowed; }\n\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px; }\n  .form-control-static.input-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn, .form-control-static.input-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn {\n    padding-left: 0;\n    padding-right: 0; }\n\n.input-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\nselect.input-sm, .input-group-sm > select.form-control,\n.input-group-sm > select.input-group-addon,\n.input-group-sm > .input-group-btn > select.btn {\n  height: 30px;\n  line-height: 30px; }\n\ntextarea.input-sm, .input-group-sm > textarea.form-control,\n.input-group-sm > textarea.input-group-addon,\n.input-group-sm > .input-group-btn > textarea.btn,\nselect[multiple].input-sm,\n.input-group-sm > select[multiple].form-control,\n.input-group-sm > select[multiple].input-group-addon,\n.input-group-sm > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px; }\n\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto; }\n\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.input-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\nselect.input-lg, .input-group-lg > select.form-control,\n.input-group-lg > select.input-group-addon,\n.input-group-lg > .input-group-btn > select.btn {\n  height: 46px;\n  line-height: 46px; }\n\ntextarea.input-lg, .input-group-lg > textarea.form-control,\n.input-group-lg > textarea.input-group-addon,\n.input-group-lg > .input-group-btn > textarea.btn,\nselect[multiple].input-lg,\n.input-group-lg > select[multiple].form-control,\n.input-group-lg > select[multiple].input-group-addon,\n.input-group-lg > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px; }\n\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto; }\n\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.33333; }\n\n.has-feedback {\n  position: relative; }\n  .has-feedback .form-control {\n    padding-right: 42.5px; }\n\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none; }\n\n.input-lg + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback,\n.input-group-lg > .input-group-addon + .form-control-feedback,\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px; }\n\n.input-sm + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback,\n.input-group-sm > .input-group-addon + .form-control-feedback,\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px; }\n\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d; }\n\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-success .form-control:focus {\n    border-color: #2b542c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168; }\n\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8; }\n\n.has-success .form-control-feedback {\n  color: #3c763d; }\n\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b; }\n\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-warning .form-control:focus {\n    border-color: #66512c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b; }\n\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3; }\n\n.has-warning .form-control-feedback {\n  color: #8a6d3b; }\n\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442; }\n\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-error .form-control:focus {\n    border-color: #843534;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483; }\n\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede; }\n\n.has-error .form-control-feedback {\n  color: #a94442; }\n\n.has-feedback label ~ .form-control-feedback {\n  top: 25px; }\n\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0; }\n\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373; }\n\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n    .form-inline .radio label,\n    .form-inline .checkbox label {\n      padding-left: 0; }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px; }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px; }\n\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .form-horizontal .form-group:before, .form-horizontal .form-group:after {\n    content: \" \";\n    display: table; }\n  .form-horizontal .form-group:after {\n    clear: both; }\n\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px; } }\n\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px; }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px; } }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px; } }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:hover, .btn:focus, .btn.focus {\n    color: #333;\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    outline: 0;\n    background-image: none;\n    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn.disabled, .btn[disabled],\n  fieldset[disabled] .btn {\n    cursor: not-allowed;\n    opacity: 0.65;\n    filter: alpha(opacity=65);\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-default:focus, .btn-default.focus {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #8c8c8c; }\n  .btn-default:hover {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n    .btn-default:active:hover, .btn-default:active:focus, .btn-default:active.focus, .btn-default.active:hover, .btn-default.active:focus, .btn-default.active.focus,\n    .open > .btn-default.dropdown-toggle:hover,\n    .open > .btn-default.dropdown-toggle:focus,\n    .open > .btn-default.dropdown-toggle.focus {\n      color: #333;\n      background-color: #d4d4d4;\n      border-color: #8c8c8c; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    background-image: none; }\n  .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled].focus,\n  fieldset[disabled] .btn-default:hover,\n  fieldset[disabled] .btn-default:focus,\n  fieldset[disabled] .btn-default.focus {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-default .badge {\n    color: #fff;\n    background-color: #333; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #286090;\n    border-color: #122b40; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #286090;\n    border-color: #204d74; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #286090;\n    border-color: #204d74; }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #204d74;\n      border-color: #122b40; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    background-image: none; }\n  .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled].focus,\n  fieldset[disabled] .btn-primary:hover,\n  fieldset[disabled] .btn-primary:focus,\n  fieldset[disabled] .btn-primary.focus {\n    background-color: #337ab7;\n    border-color: #2e6da4; }\n  .btn-primary .badge {\n    color: #337ab7;\n    background-color: #fff; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #255625; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #255625; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    background-image: none; }\n  .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled].focus,\n  fieldset[disabled] .btn-success:hover,\n  fieldset[disabled] .btn-success:focus,\n  fieldset[disabled] .btn-success.focus {\n    background-color: #5cb85c;\n    border-color: #4cae4c; }\n  .btn-success .badge {\n    color: #5cb85c;\n    background-color: #fff; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #1b6d85; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1b6d85; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    background-image: none; }\n  .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled].focus,\n  fieldset[disabled] .btn-info:hover,\n  fieldset[disabled] .btn-info:focus,\n  fieldset[disabled] .btn-info.focus {\n    background-color: #5bc0de;\n    border-color: #46b8da; }\n  .btn-info .badge {\n    color: #5bc0de;\n    background-color: #fff; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #985f0d; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #985f0d; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    background-image: none; }\n  .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled].focus,\n  fieldset[disabled] .btn-warning:hover,\n  fieldset[disabled] .btn-warning:focus,\n  fieldset[disabled] .btn-warning.focus {\n    background-color: #f0ad4e;\n    border-color: #eea236; }\n  .btn-warning .badge {\n    color: #f0ad4e;\n    background-color: #fff; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #761c19; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #761c19; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    background-image: none; }\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus,\n  fieldset[disabled] .btn-danger:hover,\n  fieldset[disabled] .btn-danger:focus,\n  fieldset[disabled] .btn-danger.focus {\n    background-color: #d9534f;\n    border-color: #d43f3a; }\n  .btn-danger .badge {\n    color: #d9534f;\n    background-color: #fff; }\n\n.btn-link {\n  color: #337ab7;\n  font-weight: normal;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled],\n  fieldset[disabled] .btn-link {\n    background-color: transparent;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover, .btn-link:focus {\n    color: #23527c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link[disabled]:hover, .btn-link[disabled]:focus,\n  fieldset[disabled] .btn-link:hover,\n  fieldset[disabled] .btn-link:focus {\n    color: #777777;\n    text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-xs, .btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 5px; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear; }\n  .fade.in {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.in {\n    display: block; }\n\ntr.collapse.in {\n  display: table-row; }\n\ntbody.collapse.in {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-property: height, visibility;\n  transition-property: height, visibility;\n  -webkit-transition-duration: 0.35s;\n  transition-duration: 0.35s;\n  -webkit-transition-timing-function: ease;\n  transition-timing-function: ease; }\n\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box; }\n  .dropdown-menu.pull-right {\n    right: 0;\n    left: auto; }\n  .dropdown-menu .divider {\n    height: 1px;\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5; }\n  .dropdown-menu > li > a {\n    display: block;\n    padding: 3px 20px;\n    clear: both;\n    font-weight: normal;\n    line-height: 1.42857;\n    color: #333333;\n    white-space: nowrap; }\n\n.dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5; }\n\n.dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #337ab7; }\n\n.dropdown-menu > .disabled > a, .dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\n  color: #777777; }\n\n.dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed; }\n\n.open > .dropdown-menu {\n  display: block; }\n\n.open > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  left: auto;\n  right: 0; }\n\n.dropdown-menu-left {\n  left: 0;\n  right: auto; }\n\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857;\n  color: #777777;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990; }\n\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto; }\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n  content: \"\"; }\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px; }\n\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    right: 0;\n    left: auto; }\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto; } }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    float: left; }\n    .btn-group > .btn:hover, .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:hover,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px; }\n\n.btn-toolbar {\n  margin-left: -5px; }\n  .btn-toolbar:before, .btn-toolbar:after {\n    content: \" \";\n    display: table; }\n  .btn-toolbar:after {\n    clear: both; }\n  .btn-toolbar .btn,\n  .btn-toolbar .btn-group,\n  .btn-toolbar .input-group {\n    float: left; }\n  .btn-toolbar > .btn,\n  .btn-toolbar > .btn-group,\n  .btn-toolbar > .input-group {\n    margin-left: 5px; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px; }\n\n.btn-group > .btn-lg + .dropdown-toggle, .btn-group-lg.btn-group > .btn + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px; }\n\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn-group.open .dropdown-toggle.btn-link {\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n\n.btn .caret {\n  margin-left: 0; }\n\n.btn-lg .caret, .btn-group-lg > .btn .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0; }\n\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {\n  border-width: 0 5px 5px; }\n\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%; }\n\n.btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after {\n  content: \" \";\n  display: table; }\n\n.btn-group-vertical > .btn-group:after {\n  clear: both; }\n\n.btn-group-vertical > .btn-group > .btn {\n  float: none; }\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate; }\n  .btn-group-justified > .btn,\n  .btn-group-justified > .btn-group {\n    float: none;\n    display: table-cell;\n    width: 1%; }\n  .btn-group-justified > .btn-group .btn {\n    width: 100%; }\n  .btn-group-justified > .btn-group .dropdown-menu {\n    left: auto; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate; }\n  .input-group[class*=\"col-\"] {\n    float: none;\n    padding-left: 0;\n    padding-right: 0; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    float: left;\n    width: 100%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px; }\n  .input-group-addon.input-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 5px 10px;\n    font-size: 12px;\n    border-radius: 3px; }\n  .input-group-addon.input-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 10px 16px;\n    font-size: 18px;\n    border-radius: 6px; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:first-child {\n  border-right: 0; }\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group-addon:last-child {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .btn:active {\n      z-index: 2; }\n  .input-group-btn:first-child > .btn,\n  .input-group-btn:first-child > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:last-child > .btn,\n  .input-group-btn:last-child > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none; }\n  .nav:before, .nav:after {\n    content: \" \";\n    display: table; }\n  .nav:after {\n    clear: both; }\n  .nav > li {\n    position: relative;\n    display: block; }\n    .nav > li > a {\n      position: relative;\n      display: block;\n      padding: 10px 15px; }\n      .nav > li > a:hover, .nav > li > a:focus {\n        text-decoration: none;\n        background-color: #eeeeee; }\n    .nav > li.disabled > a {\n      color: #777777; }\n      .nav > li.disabled > a:hover, .nav > li.disabled > a:focus {\n        color: #777777;\n        text-decoration: none;\n        background-color: transparent;\n        cursor: not-allowed; }\n  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n    background-color: #eeeeee;\n    border-color: #337ab7; }\n  .nav .nav-divider {\n    height: 1px;\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5; }\n  .nav > li > a > img {\n    max-width: none; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs > li {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs > li > a {\n      margin-right: 2px;\n      line-height: 1.42857;\n      border: 1px solid transparent;\n      border-radius: 4px 4px 0 0; }\n      .nav-tabs > li > a:hover {\n        border-color: #eeeeee #eeeeee #ddd; }\n    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\n      color: #555555;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-bottom-color: transparent;\n      cursor: default; }\n\n.nav-pills > li {\n  float: left; }\n  .nav-pills > li > a {\n    border-radius: 4px; }\n  .nav-pills > li + li {\n    margin-left: 2px; }\n  .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {\n    color: #fff;\n    background-color: #337ab7; }\n\n.nav-stacked > li {\n  float: none; }\n  .nav-stacked > li + li {\n    margin-top: 2px;\n    margin-left: 0; }\n\n.nav-justified, .nav-tabs.nav-justified {\n  width: 100%; }\n  .nav-justified > li, .nav-tabs.nav-justified > li {\n    float: none; }\n    .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n      text-align: center;\n      margin-bottom: 5px; }\n  .nav-justified > .dropdown .dropdown-menu {\n    top: auto;\n    left: auto; }\n  @media (min-width: 768px) {\n    .nav-justified > li, .nav-tabs.nav-justified > li {\n      display: table-cell;\n      width: 1%; }\n      .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n        margin-bottom: 0; } }\n\n.nav-tabs-justified, .nav-tabs.nav-justified {\n  border-bottom: 0; }\n  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n    margin-right: 0;\n    border-radius: 4px; }\n  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n    border: 1px solid #ddd; }\n  @media (min-width: 768px) {\n    .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n      border-bottom: 1px solid #ddd;\n      border-radius: 4px 4px 0 0; }\n    .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n    .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n    .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n      border-bottom-color: #fff; } }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent; }\n  .navbar:before, .navbar:after {\n    content: \" \";\n    display: table; }\n  .navbar:after {\n    clear: both; }\n  @media (min-width: 768px) {\n    .navbar {\n      border-radius: 4px; } }\n\n.navbar-header:before, .navbar-header:after {\n  content: \" \";\n  display: table; }\n\n.navbar-header:after {\n  clear: both; }\n\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left; } }\n\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch; }\n  .navbar-collapse:before, .navbar-collapse:after {\n    content: \" \";\n    display: table; }\n  .navbar-collapse:after {\n    clear: both; }\n  .navbar-collapse.in {\n    overflow-y: auto; }\n  @media (min-width: 768px) {\n    .navbar-collapse {\n      width: auto;\n      border-top: 0;\n      box-shadow: none; }\n      .navbar-collapse.collapse {\n        display: block !important;\n        height: auto !important;\n        padding-bottom: 0;\n        overflow: visible !important; }\n      .navbar-collapse.in {\n        overflow-y: visible; }\n      .navbar-fixed-top .navbar-collapse,\n      .navbar-static-top .navbar-collapse,\n      .navbar-fixed-bottom .navbar-collapse {\n        padding-left: 0;\n        padding-right: 0; } }\n\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px; }\n  @media (max-device-width: 480px) and (orientation: landscape) {\n    .navbar-fixed-top .navbar-collapse,\n    .navbar-fixed-bottom .navbar-collapse {\n      max-height: 200px; } }\n\n.container > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-header,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 768px) {\n    .container > .navbar-header,\n    .container > .navbar-collapse,\n    .container-fluid > .navbar-header,\n    .container-fluid > .navbar-collapse {\n      margin-right: 0;\n      margin-left: 0; } }\n\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px; }\n  @media (min-width: 768px) {\n    .navbar-static-top {\n      border-radius: 0; } }\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n  @media (min-width: 768px) {\n    .navbar-fixed-top,\n    .navbar-fixed-bottom {\n      border-radius: 0; } }\n\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px; }\n\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0; }\n\n.navbar-brand {\n  float: left;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n  height: 50px; }\n  .navbar-brand:hover, .navbar-brand:focus {\n    text-decoration: none; }\n  .navbar-brand > img {\n    display: block; }\n  @media (min-width: 768px) {\n    .navbar > .container .navbar-brand,\n    .navbar > .container-fluid .navbar-brand {\n      margin-left: -15px; } }\n\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n  .navbar-toggle:focus {\n    outline: 0; }\n  .navbar-toggle .icon-bar {\n    display: block;\n    width: 22px;\n    height: 2px;\n    border-radius: 1px; }\n  .navbar-toggle .icon-bar + .icon-bar {\n    margin-top: 4px; }\n  @media (min-width: 768px) {\n    .navbar-toggle {\n      display: none; } }\n\n.navbar-nav {\n  margin: 7.5px -15px; }\n  .navbar-nav > li > a {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    line-height: 20px; }\n  @media (max-width: 767px) {\n    .navbar-nav .open .dropdown-menu {\n      position: static;\n      float: none;\n      width: auto;\n      margin-top: 0;\n      background-color: transparent;\n      border: 0;\n      box-shadow: none; }\n      .navbar-nav .open .dropdown-menu > li > a,\n      .navbar-nav .open .dropdown-menu .dropdown-header {\n        padding: 5px 15px 5px 25px; }\n      .navbar-nav .open .dropdown-menu > li > a {\n        line-height: 20px; }\n        .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-nav .open .dropdown-menu > li > a:focus {\n          background-image: none; } }\n  @media (min-width: 768px) {\n    .navbar-nav {\n      float: left;\n      margin: 0; }\n      .navbar-nav > li {\n        float: left; }\n        .navbar-nav > li > a {\n          padding-top: 15px;\n          padding-bottom: 15px; } }\n\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 8px;\n  margin-bottom: 8px; }\n  @media (min-width: 768px) {\n    .navbar-form .form-group {\n      display: inline-block;\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .navbar-form .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .navbar-form .form-control-static {\n      display: inline-block; }\n    .navbar-form .input-group {\n      display: inline-table;\n      vertical-align: middle; }\n      .navbar-form .input-group .input-group-addon,\n      .navbar-form .input-group .input-group-btn,\n      .navbar-form .input-group .form-control {\n        width: auto; }\n    .navbar-form .input-group > .form-control {\n      width: 100%; }\n    .navbar-form .control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .navbar-form .radio,\n    .navbar-form .checkbox {\n      display: inline-block;\n      margin-top: 0;\n      margin-bottom: 0;\n      vertical-align: middle; }\n      .navbar-form .radio label,\n      .navbar-form .checkbox label {\n        padding-left: 0; }\n    .navbar-form .radio input[type=\"radio\"],\n    .navbar-form .checkbox input[type=\"checkbox\"] {\n      position: relative;\n      margin-left: 0; }\n    .navbar-form .has-feedback .form-control-feedback {\n      top: 0; } }\n  @media (max-width: 767px) {\n    .navbar-form .form-group {\n      margin-bottom: 5px; }\n      .navbar-form .form-group:last-child {\n        margin-bottom: 0; } }\n  @media (min-width: 768px) {\n    .navbar-form {\n      width: auto;\n      border: 0;\n      margin-left: 0;\n      margin-right: 0;\n      padding-top: 0;\n      padding-bottom: 0;\n      -webkit-box-shadow: none;\n      box-shadow: none; } }\n\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px; }\n  .navbar-btn.btn-sm, .btn-group-sm > .navbar-btn.btn {\n    margin-top: 10px;\n    margin-bottom: 10px; }\n  .navbar-btn.btn-xs, .btn-group-xs > .navbar-btn.btn {\n    margin-top: 14px;\n    margin-bottom: 14px; }\n\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px; }\n  @media (min-width: 768px) {\n    .navbar-text {\n      float: left;\n      margin-left: 15px;\n      margin-right: 15px; } }\n\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important; }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px; }\n    .navbar-right ~ .navbar-right {\n      margin-right: 0; } }\n\n.navbar-default {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7; }\n  .navbar-default .navbar-brand {\n    color: #777; }\n    .navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {\n      color: #5e5e5e;\n      background-color: transparent; }\n  .navbar-default .navbar-text {\n    color: #777; }\n  .navbar-default .navbar-nav > li > a {\n    color: #777; }\n    .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\n      color: #333;\n      background-color: transparent; }\n  .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\n    color: #555;\n    background-color: #e7e7e7; }\n  .navbar-default .navbar-nav > .disabled > a, .navbar-default .navbar-nav > .disabled > a:hover, .navbar-default .navbar-nav > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent; }\n  .navbar-default .navbar-toggle {\n    border-color: #ddd; }\n    .navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {\n      background-color: #ddd; }\n    .navbar-default .navbar-toggle .icon-bar {\n      background-color: #888; }\n  .navbar-default .navbar-collapse,\n  .navbar-default .navbar-form {\n    border-color: #e7e7e7; }\n  .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {\n    background-color: #e7e7e7;\n    color: #555; }\n  @media (max-width: 767px) {\n    .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n      color: #777; }\n      .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n        color: #333;\n        background-color: transparent; }\n    .navbar-default .navbar-nav .open .dropdown-menu > .active > a, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n      color: #555;\n      background-color: #e7e7e7; }\n    .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n      color: #ccc;\n      background-color: transparent; } }\n  .navbar-default .navbar-link {\n    color: #777; }\n    .navbar-default .navbar-link:hover {\n      color: #333; }\n  .navbar-default .btn-link {\n    color: #777; }\n    .navbar-default .btn-link:hover, .navbar-default .btn-link:focus {\n      color: #333; }\n    .navbar-default .btn-link[disabled]:hover, .navbar-default .btn-link[disabled]:focus,\n    fieldset[disabled] .navbar-default .btn-link:hover,\n    fieldset[disabled] .navbar-default .btn-link:focus {\n      color: #ccc; }\n\n.navbar-inverse {\n  background-color: #222;\n  border-color: #090909; }\n  .navbar-inverse .navbar-brand {\n    color: #9d9d9d; }\n    .navbar-inverse .navbar-brand:hover, .navbar-inverse .navbar-brand:focus {\n      color: #fff;\n      background-color: transparent; }\n  .navbar-inverse .navbar-text {\n    color: #9d9d9d; }\n  .navbar-inverse .navbar-nav > li > a {\n    color: #9d9d9d; }\n    .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {\n      color: #fff;\n      background-color: transparent; }\n  .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {\n    color: #fff;\n    background-color: #090909; }\n  .navbar-inverse .navbar-nav > .disabled > a, .navbar-inverse .navbar-nav > .disabled > a:hover, .navbar-inverse .navbar-nav > .disabled > a:focus {\n    color: #444;\n    background-color: transparent; }\n  .navbar-inverse .navbar-toggle {\n    border-color: #333; }\n    .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {\n      background-color: #333; }\n    .navbar-inverse .navbar-toggle .icon-bar {\n      background-color: #fff; }\n  .navbar-inverse .navbar-collapse,\n  .navbar-inverse .navbar-form {\n    border-color: #101010; }\n  .navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus {\n    background-color: #090909;\n    color: #fff; }\n  @media (max-width: 767px) {\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n      border-color: #090909; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n      background-color: #090909; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n      color: #9d9d9d; }\n      .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n        color: #fff;\n        background-color: transparent; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n      color: #fff;\n      background-color: #090909; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n      color: #444;\n      background-color: transparent; } }\n  .navbar-inverse .navbar-link {\n    color: #9d9d9d; }\n    .navbar-inverse .navbar-link:hover {\n      color: #fff; }\n  .navbar-inverse .btn-link {\n    color: #9d9d9d; }\n    .navbar-inverse .btn-link:hover, .navbar-inverse .btn-link:focus {\n      color: #fff; }\n    .navbar-inverse .btn-link[disabled]:hover, .navbar-inverse .btn-link[disabled]:focus,\n    fieldset[disabled] .navbar-inverse .btn-link:hover,\n    fieldset[disabled] .navbar-inverse .btn-link:focus {\n      color: #444; }\n\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px; }\n  .breadcrumb > li {\n    display: inline-block; }\n    .breadcrumb > li + li:before {\n      content: \"/\\A0\";\n      padding: 0 5px;\n      color: #ccc; }\n  .breadcrumb > .active {\n    color: #777777; }\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px; }\n  .pagination > li {\n    display: inline; }\n    .pagination > li > a,\n    .pagination > li > span {\n      position: relative;\n      float: left;\n      padding: 6px 12px;\n      line-height: 1.42857;\n      text-decoration: none;\n      color: #337ab7;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      margin-left: -1px; }\n    .pagination > li:first-child > a,\n    .pagination > li:first-child > span {\n      margin-left: 0;\n      border-bottom-left-radius: 4px;\n      border-top-left-radius: 4px; }\n    .pagination > li:last-child > a,\n    .pagination > li:last-child > span {\n      border-bottom-right-radius: 4px;\n      border-top-right-radius: 4px; }\n  .pagination > li > a:hover, .pagination > li > a:focus,\n  .pagination > li > span:hover,\n  .pagination > li > span:focus {\n    z-index: 2;\n    color: #23527c;\n    background-color: #eeeeee;\n    border-color: #ddd; }\n  .pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus,\n  .pagination > .active > span,\n  .pagination > .active > span:hover,\n  .pagination > .active > span:focus {\n    z-index: 3;\n    color: #fff;\n    background-color: #337ab7;\n    border-color: #337ab7;\n    cursor: default; }\n  .pagination > .disabled > span,\n  .pagination > .disabled > span:hover,\n  .pagination > .disabled > span:focus,\n  .pagination > .disabled > a,\n  .pagination > .disabled > a:hover,\n  .pagination > .disabled > a:focus {\n    color: #777777;\n    background-color: #fff;\n    border-color: #ddd;\n    cursor: not-allowed; }\n\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333; }\n\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px; }\n\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px; }\n\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px; }\n\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px; }\n\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center; }\n  .pager:before, .pager:after {\n    content: \" \";\n    display: table; }\n  .pager:after {\n    clear: both; }\n  .pager li {\n    display: inline; }\n    .pager li > a,\n    .pager li > span {\n      display: inline-block;\n      padding: 5px 14px;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-radius: 15px; }\n    .pager li > a:hover,\n    .pager li > a:focus {\n      text-decoration: none;\n      background-color: #eeeeee; }\n  .pager .next > a,\n  .pager .next > span {\n    float: right; }\n  .pager .previous > a,\n  .pager .previous > span {\n    float: left; }\n  .pager .disabled > a,\n  .pager .disabled > a:hover,\n  .pager .disabled > a:focus,\n  .pager .disabled > span {\n    color: #777777;\n    background-color: #fff;\n    cursor: not-allowed; }\n\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em; }\n  .label:empty {\n    display: none; }\n  .btn .label {\n    position: relative;\n    top: -1px; }\n\na.label:hover, a.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.label-default {\n  background-color: #777777; }\n  .label-default[href]:hover, .label-default[href]:focus {\n    background-color: #5e5e5e; }\n\n.label-primary {\n  background-color: #337ab7; }\n  .label-primary[href]:hover, .label-primary[href]:focus {\n    background-color: #286090; }\n\n.label-success {\n  background-color: #5cb85c; }\n  .label-success[href]:hover, .label-success[href]:focus {\n    background-color: #449d44; }\n\n.label-info {\n  background-color: #5bc0de; }\n  .label-info[href]:hover, .label-info[href]:focus {\n    background-color: #31b0d5; }\n\n.label-warning {\n  background-color: #f0ad4e; }\n  .label-warning[href]:hover, .label-warning[href]:focus {\n    background-color: #ec971f; }\n\n.label-danger {\n  background-color: #d9534f; }\n  .label-danger[href]:hover, .label-danger[href]:focus {\n    background-color: #c9302c; }\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px; }\n  .badge:empty {\n    display: none; }\n  .btn .badge {\n    position: relative;\n    top: -1px; }\n  .btn-xs .badge, .btn-group-xs > .btn .badge,\n  .btn-group-xs > .btn .badge {\n    top: 0;\n    padding: 1px 5px; }\n  .list-group-item.active > .badge,\n  .nav-pills > .active > a > .badge {\n    color: #337ab7;\n    background-color: #fff; }\n  .list-group-item > .badge {\n    float: right; }\n  .list-group-item > .badge + .badge {\n    margin-right: 5px; }\n  .nav-pills > li > a > .badge {\n    margin-left: 3px; }\n\na.badge:hover, a.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eeeeee; }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    color: inherit; }\n  .jumbotron p {\n    margin-bottom: 15px;\n    font-size: 21px;\n    font-weight: 200; }\n  .jumbotron > hr {\n    border-top-color: #d5d5d5; }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    border-radius: 6px;\n    padding-left: 15px;\n    padding-right: 15px; }\n  .jumbotron .container {\n    max-width: 100%; }\n  @media screen and (min-width: 768px) {\n    .jumbotron {\n      padding-top: 48px;\n      padding-bottom: 48px; }\n      .container .jumbotron,\n      .container-fluid .jumbotron {\n        padding-left: 60px;\n        padding-right: 60px; }\n      .jumbotron h1,\n      .jumbotron .h1 {\n        font-size: 63px; } }\n\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s ease-in-out;\n  -o-transition: border 0.2s ease-in-out;\n  transition: border 0.2s ease-in-out; }\n  .thumbnail > img,\n  .thumbnail a > img {\n    display: block;\n    max-width: 100%;\n    height: auto;\n    margin-left: auto;\n    margin-right: auto; }\n  .thumbnail .caption {\n    padding: 9px;\n    color: #333333; }\n\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #337ab7; }\n\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n  .alert h4 {\n    margin-top: 0;\n    color: inherit; }\n  .alert .alert-link {\n    font-weight: bold; }\n  .alert > p,\n  .alert > ul {\n    margin-bottom: 0; }\n  .alert > p + p {\n    margin-top: 5px; }\n\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px; }\n  .alert-dismissable .close,\n  .alert-dismissible .close {\n    position: relative;\n    top: -2px;\n    right: -21px;\n    color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c9e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6e1ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7e1b5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebccd1;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9c0; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\n\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #337ab7;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease; }\n\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px; }\n\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite; }\n\n.progress-bar-success {\n  background-color: #5cb85c; }\n  .progress-striped .progress-bar-success {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-bar-info {\n  background-color: #5bc0de; }\n  .progress-striped .progress-bar-info {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-bar-warning {\n  background-color: #f0ad4e; }\n  .progress-striped .progress-bar-warning {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-bar-danger {\n  background-color: #d9534f; }\n  .progress-striped .progress-bar-danger {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.media {\n  margin-top: 15px; }\n  .media:first-child {\n    margin-top: 0; }\n\n.media,\n.media-body {\n  zoom: 1;\n  overflow: hidden; }\n\n.media-body {\n  width: 10000px; }\n\n.media-object {\n  display: block; }\n  .media-object.img-thumbnail {\n    max-width: none; }\n\n.media-right,\n.media > .pull-right {\n  padding-left: 10px; }\n\n.media-left,\n.media > .pull-left {\n  padding-right: 10px; }\n\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top; }\n\n.media-middle {\n  vertical-align: middle; }\n\n.media-bottom {\n  vertical-align: bottom; }\n\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.media-list {\n  padding-left: 0;\n  list-style: none; }\n\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .list-group-item:first-child {\n    border-top-right-radius: 4px;\n    border-top-left-radius: 4px; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 4px;\n    border-bottom-left-radius: 4px; }\n\na.list-group-item,\nbutton.list-group-item {\n  color: #555; }\n  a.list-group-item .list-group-item-heading,\n  button.list-group-item .list-group-item-heading {\n    color: #333; }\n  a.list-group-item:hover, a.list-group-item:focus,\n  button.list-group-item:hover,\n  button.list-group-item:focus {\n    text-decoration: none;\n    color: #555;\n    background-color: #f5f5f5; }\n\nbutton.list-group-item {\n  width: 100%;\n  text-align: left; }\n\n.list-group-item.disabled, .list-group-item.disabled:hover, .list-group-item.disabled:focus {\n  background-color: #eeeeee;\n  color: #777777;\n  cursor: not-allowed; }\n  .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading {\n    color: inherit; }\n  .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text {\n    color: #777777; }\n\n.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7; }\n  .list-group-item.active .list-group-item-heading,\n  .list-group-item.active .list-group-item-heading > small,\n  .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\n  .list-group-item.active:hover .list-group-item-heading > small,\n  .list-group-item.active:hover .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\n  .list-group-item.active:focus .list-group-item-heading > small,\n  .list-group-item.active:focus .list-group-item-heading > .small {\n    color: inherit; }\n  .list-group-item.active .list-group-item-text, .list-group-item.active:hover .list-group-item-text, .list-group-item.active:focus .list-group-item-text {\n    color: #c7ddef; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:hover, a.list-group-item-success:focus,\n  button.list-group-item-success:hover,\n  button.list-group-item-success:focus {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active, a.list-group-item-success.active:hover, a.list-group-item-success.active:focus,\n  button.list-group-item-success.active,\n  button.list-group-item-success.active:hover,\n  button.list-group-item-success.active:focus {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:hover, a.list-group-item-info:focus,\n  button.list-group-item-info:hover,\n  button.list-group-item-info:focus {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active, a.list-group-item-info.active:hover, a.list-group-item-info.active:focus,\n  button.list-group-item-info.active,\n  button.list-group-item-info.active:hover,\n  button.list-group-item-info.active:focus {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:hover, a.list-group-item-warning:focus,\n  button.list-group-item-warning:hover,\n  button.list-group-item-warning:focus {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active, a.list-group-item-warning.active:hover, a.list-group-item-warning.active:focus,\n  button.list-group-item-warning.active,\n  button.list-group-item-warning.active:hover,\n  button.list-group-item-warning.active:focus {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:hover, a.list-group-item-danger:focus,\n  button.list-group-item-danger:hover,\n  button.list-group-item-danger:focus {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active, a.list-group-item-danger.active:hover, a.list-group-item-danger.active:focus,\n  button.list-group-item-danger.active,\n  button.list-group-item-danger.active:hover,\n  button.list-group-item-danger.active:focus {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.panel-body {\n  padding: 15px; }\n  .panel-body:before, .panel-body:after {\n    content: \" \";\n    display: table; }\n  .panel-body:after {\n    clear: both; }\n\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px; }\n  .panel-heading > .dropdown .dropdown-toggle {\n    color: inherit; }\n\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit; }\n  .panel-title > a,\n  .panel-title > small,\n  .panel-title > .small,\n  .panel-title > small > a,\n  .panel-title > .small > a {\n    color: inherit; }\n\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px; }\n\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0; }\n  .panel > .list-group .list-group-item,\n  .panel > .panel-collapse > .list-group .list-group-item {\n    border-width: 1px 0;\n    border-radius: 0; }\n  .panel > .list-group:first-child .list-group-item:first-child,\n  .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n    border-top: 0;\n    border-top-right-radius: 3px;\n    border-top-left-radius: 3px; }\n  .panel > .list-group:last-child .list-group-item:last-child,\n  .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n    border-bottom: 0;\n    border-bottom-right-radius: 3px;\n    border-bottom-left-radius: 3px; }\n\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0; }\n\n.list-group + .panel-footer {\n  border-top-width: 0; }\n\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0; }\n  .panel > .table caption,\n  .panel > .table-responsive > .table caption,\n  .panel > .panel-collapse > .table caption {\n    padding-left: 15px;\n    padding-right: 15px; }\n\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px; }\n  .panel > .table:first-child > thead:first-child > tr:first-child,\n  .panel > .table:first-child > tbody:first-child > tr:first-child,\n  .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n  .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px; }\n    .panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n    .panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n      border-top-left-radius: 3px; }\n    .panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n    .panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n      border-top-right-radius: 3px; }\n\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px; }\n  .panel > .table:last-child > tbody:last-child > tr:last-child,\n  .panel > .table:last-child > tfoot:last-child > tr:last-child,\n  .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n  .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px; }\n    .panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n    .panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n      border-bottom-left-radius: 3px; }\n    .panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n    .panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n      border-bottom-right-radius: 3px; }\n\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #ddd; }\n\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0; }\n\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0; }\n  .panel > .table-bordered > thead > tr > th:first-child,\n  .panel > .table-bordered > thead > tr > td:first-child,\n  .panel > .table-bordered > tbody > tr > th:first-child,\n  .panel > .table-bordered > tbody > tr > td:first-child,\n  .panel > .table-bordered > tfoot > tr > th:first-child,\n  .panel > .table-bordered > tfoot > tr > td:first-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0; }\n  .panel > .table-bordered > thead > tr > th:last-child,\n  .panel > .table-bordered > thead > tr > td:last-child,\n  .panel > .table-bordered > tbody > tr > th:last-child,\n  .panel > .table-bordered > tbody > tr > td:last-child,\n  .panel > .table-bordered > tfoot > tr > th:last-child,\n  .panel > .table-bordered > tfoot > tr > td:last-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0; }\n  .panel > .table-bordered > thead > tr:first-child > td,\n  .panel > .table-bordered > thead > tr:first-child > th,\n  .panel > .table-bordered > tbody > tr:first-child > td,\n  .panel > .table-bordered > tbody > tr:first-child > th,\n  .panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n  .panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n  .panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n  .panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n    border-bottom: 0; }\n  .panel > .table-bordered > tbody > tr:last-child > td,\n  .panel > .table-bordered > tbody > tr:last-child > th,\n  .panel > .table-bordered > tfoot > tr:last-child > td,\n  .panel > .table-bordered > tfoot > tr:last-child > th,\n  .panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n  .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n    border-bottom: 0; }\n\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0; }\n\n.panel-group {\n  margin-bottom: 20px; }\n  .panel-group .panel {\n    margin-bottom: 0;\n    border-radius: 4px; }\n    .panel-group .panel + .panel {\n      margin-top: 5px; }\n  .panel-group .panel-heading {\n    border-bottom: 0; }\n    .panel-group .panel-heading + .panel-collapse > .panel-body,\n    .panel-group .panel-heading + .panel-collapse > .list-group {\n      border-top: 1px solid #ddd; }\n  .panel-group .panel-footer {\n    border-top: 0; }\n    .panel-group .panel-footer + .panel-collapse .panel-body {\n      border-bottom: 1px solid #ddd; }\n\n.panel-default {\n  border-color: #ddd; }\n  .panel-default > .panel-heading {\n    color: #333333;\n    background-color: #f5f5f5;\n    border-color: #ddd; }\n    .panel-default > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #ddd; }\n    .panel-default > .panel-heading .badge {\n      color: #f5f5f5;\n      background-color: #333333; }\n  .panel-default > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #ddd; }\n\n.panel-primary {\n  border-color: #337ab7; }\n  .panel-primary > .panel-heading {\n    color: #fff;\n    background-color: #337ab7;\n    border-color: #337ab7; }\n    .panel-primary > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #337ab7; }\n    .panel-primary > .panel-heading .badge {\n      color: #337ab7;\n      background-color: #fff; }\n  .panel-primary > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #337ab7; }\n\n.panel-success {\n  border-color: #d6e9c6; }\n  .panel-success > .panel-heading {\n    color: #3c763d;\n    background-color: #dff0d8;\n    border-color: #d6e9c6; }\n    .panel-success > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #d6e9c6; }\n    .panel-success > .panel-heading .badge {\n      color: #dff0d8;\n      background-color: #3c763d; }\n  .panel-success > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #d6e9c6; }\n\n.panel-info {\n  border-color: #bce8f1; }\n  .panel-info > .panel-heading {\n    color: #31708f;\n    background-color: #d9edf7;\n    border-color: #bce8f1; }\n    .panel-info > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #bce8f1; }\n    .panel-info > .panel-heading .badge {\n      color: #d9edf7;\n      background-color: #31708f; }\n  .panel-info > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #bce8f1; }\n\n.panel-warning {\n  border-color: #faebcc; }\n  .panel-warning > .panel-heading {\n    color: #8a6d3b;\n    background-color: #fcf8e3;\n    border-color: #faebcc; }\n    .panel-warning > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #faebcc; }\n    .panel-warning > .panel-heading .badge {\n      color: #fcf8e3;\n      background-color: #8a6d3b; }\n  .panel-warning > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #faebcc; }\n\n.panel-danger {\n  border-color: #ebccd1; }\n  .panel-danger > .panel-heading {\n    color: #a94442;\n    background-color: #f2dede;\n    border-color: #ebccd1; }\n    .panel-danger > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #ebccd1; }\n    .panel-danger > .panel-heading .badge {\n      color: #f2dede;\n      background-color: #a94442; }\n  .panel-danger > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #ebccd1; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    height: 100%;\n    width: 100%;\n    border: 0; }\n\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%; }\n\n.embed-responsive-4by3 {\n  padding-bottom: 75%; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n  .well blockquote {\n    border-color: #ddd;\n    border-color: rgba(0, 0, 0, 0.15); }\n\n.well-lg {\n  padding: 24px;\n  border-radius: 6px; }\n\n.well-sm {\n  padding: 9px;\n  border-radius: 3px; }\n\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.2;\n  filter: alpha(opacity=20); }\n  .close:hover, .close:focus {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: 0.5;\n    filter: alpha(opacity=50); }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    -webkit-transform: translate(0, -25%);\n    -ms-transform: translate(0, -25%);\n    -o-transform: translate(0, -25%);\n    transform: translate(0, -25%);\n    -webkit-transition: -webkit-transform 0.3s ease-out;\n    -moz-transition: -moz-transform 0.3s ease-out;\n    -o-transition: -o-transform 0.3s ease-out;\n    transition: transform 0.3s ease-out; }\n  .modal.in .modal-dialog {\n    -webkit-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0;\n    filter: alpha(opacity=0); }\n  .modal-backdrop.in {\n    opacity: 0.5;\n    filter: alpha(opacity=50); }\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5; }\n  .modal-header:before, .modal-header:after {\n    content: \" \";\n    display: table; }\n  .modal-header:after {\n    clear: both; }\n\n.modal-header .close {\n  margin-top: -2px; }\n\n.modal-title {\n  margin: 0;\n  line-height: 1.42857; }\n\n.modal-body {\n  position: relative;\n  padding: 15px; }\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5; }\n  .modal-footer:before, .modal-footer:after {\n    content: \" \";\n    display: table; }\n  .modal-footer:after {\n    clear: both; }\n  .modal-footer .btn + .btn {\n    margin-left: 5px;\n    margin-bottom: 0; }\n  .modal-footer .btn-group .btn + .btn {\n    margin-left: -1px; }\n  .modal-footer .btn-block + .btn-block {\n    margin-left: 0; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto; }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); }\n  .modal-sm {\n    width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 12px;\n  opacity: 0;\n  filter: alpha(opacity=0); }\n  .tooltip.in {\n    opacity: 0.9;\n    filter: alpha(opacity=90); }\n  .tooltip.top {\n    margin-top: -3px;\n    padding: 5px 0; }\n  .tooltip.right {\n    margin-left: 3px;\n    padding: 0 5px; }\n  .tooltip.bottom {\n    margin-top: 3px;\n    padding: 5px 0; }\n  .tooltip.left {\n    margin-left: -3px;\n    padding: 0 5px; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px; }\n\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000; }\n\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000; }\n\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000; }\n\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000; }\n\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000; }\n\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000; }\n\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000; }\n\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 14px;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); }\n  .popover.top {\n    margin-top: -10px; }\n  .popover.right {\n    margin-left: 10px; }\n  .popover.bottom {\n    margin-top: 10px; }\n  .popover.left {\n    margin-left: -10px; }\n\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover > .arrow, .popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover > .arrow {\n  border-width: 11px; }\n\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\"; }\n\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px; }\n  .popover.top > .arrow:after {\n    content: \" \";\n    bottom: 1px;\n    margin-left: -10px;\n    border-bottom-width: 0;\n    border-top-color: #fff; }\n\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25); }\n  .popover.right > .arrow:after {\n    content: \" \";\n    left: 1px;\n    bottom: -10px;\n    border-left-width: 0;\n    border-right-color: #fff; }\n\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px; }\n  .popover.bottom > .arrow:after {\n    content: \" \";\n    top: 1px;\n    margin-left: -10px;\n    border-top-width: 0;\n    border-bottom-color: #fff; }\n\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25); }\n  .popover.left > .arrow:after {\n    content: \" \";\n    right: 1px;\n    border-right-width: 0;\n    border-left-color: #fff;\n    bottom: -10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%; }\n  .carousel-inner > .item {\n    display: none;\n    position: relative;\n    -webkit-transition: 0.6s ease-in-out left;\n    -o-transition: 0.6s ease-in-out left;\n    transition: 0.6s ease-in-out left; }\n    .carousel-inner > .item > img,\n    .carousel-inner > .item > a > img {\n      display: block;\n      max-width: 100%;\n      height: auto;\n      line-height: 1; }\n    @media all and (transform-3d), (-webkit-transform-3d) {\n      .carousel-inner > .item {\n        -webkit-transition: -webkit-transform 0.6s ease-in-out;\n        -moz-transition: -moz-transform 0.6s ease-in-out;\n        -o-transition: -o-transform 0.6s ease-in-out;\n        transition: transform 0.6s ease-in-out;\n        -webkit-backface-visibility: hidden;\n        -moz-backface-visibility: hidden;\n        backface-visibility: hidden;\n        -webkit-perspective: 1000px;\n        -moz-perspective: 1000px;\n        perspective: 1000px; }\n        .carousel-inner > .item.next, .carousel-inner > .item.active.right {\n          -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n          left: 0; }\n        .carousel-inner > .item.prev, .carousel-inner > .item.active.left {\n          -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n          left: 0; }\n        .carousel-inner > .item.next.left, .carousel-inner > .item.prev.right, .carousel-inner > .item.active {\n          -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n          left: 0; } }\n  .carousel-inner > .active,\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    display: block; }\n  .carousel-inner > .active {\n    left: 0; }\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .carousel-inner > .next {\n    left: 100%; }\n  .carousel-inner > .prev {\n    left: -100%; }\n  .carousel-inner > .next.left,\n  .carousel-inner > .prev.right {\n    left: 0; }\n  .carousel-inner > .active.left {\n    left: -100%; }\n  .carousel-inner > .active.right {\n    left: 100%; }\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  background-color: transparent; }\n  .carousel-control.left {\n    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1); }\n  .carousel-control.right {\n    left: auto;\n    right: 0;\n    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1); }\n  .carousel-control:hover, .carousel-control:focus {\n    outline: 0;\n    color: #fff;\n    text-decoration: none;\n    opacity: 0.9;\n    filter: alpha(opacity=90); }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next,\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right {\n    position: absolute;\n    top: 50%;\n    margin-top: -10px;\n    z-index: 5;\n    display: inline-block; }\n  .carousel-control .icon-prev,\n  .carousel-control .glyphicon-chevron-left {\n    left: 50%;\n    margin-left: -10px; }\n  .carousel-control .icon-next,\n  .carousel-control .glyphicon-chevron-right {\n    right: 50%;\n    margin-right: -10px; }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 20px;\n    height: 20px;\n    line-height: 1;\n    font-family: serif; }\n  .carousel-control .icon-prev:before {\n    content: '\\2039'; }\n  .carousel-control .icon-next:before {\n    content: '\\203A'; }\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center; }\n  .carousel-indicators li {\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin: 1px;\n    text-indent: -999px;\n    border: 1px solid #fff;\n    border-radius: 10px;\n    cursor: pointer;\n    background-color: #000 \\9;\n    background-color: transparent; }\n  .carousel-indicators .active {\n    margin: 0;\n    width: 12px;\n    height: 12px;\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\n  .carousel-caption .btn {\n    text-shadow: none; }\n\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -10px;\n    font-size: 30px; }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -10px; }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -10px; }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px; }\n  .carousel-indicators {\n    bottom: 20px; } }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: table; }\n\n.clearfix:after {\n  clear: both; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.pull-right {\n  float: right !important; }\n\n.pull-left {\n  float: left !important; }\n\n.hide {\n  display: none !important; }\n\n.show {\n  display: block !important; }\n\n.invisible {\n  visibility: hidden; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.hidden {\n  display: none !important; }\n\n.affix {\n  position: fixed; }\n\n@-ms-viewport {\n  width: device-width; }\n\n.visible-xs {\n  display: none !important; }\n\n.visible-sm {\n  display: none !important; }\n\n.visible-md {\n  display: none !important; }\n\n.visible-lg {\n  display: none !important; }\n\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important; }\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important; }\n  table.visible-xs {\n    display: table !important; }\n  tr.visible-xs {\n    display: table-row !important; }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important; }\n  table.visible-sm {\n    display: table !important; }\n  tr.visible-sm {\n    display: table-row !important; }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important; }\n  table.visible-md {\n    display: table !important; }\n  tr.visible-md {\n    display: table-row !important; }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important; }\n  table.visible-lg {\n    display: table !important; }\n  tr.visible-lg {\n    display: table-row !important; }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important; } }\n\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important; } }\n\n.visible-print {\n  display: none !important; }\n\n@media print {\n  .visible-print {\n    display: block !important; }\n  table.visible-print {\n    display: table !important; }\n  tr.visible-print {\n    display: table-row !important; }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important; } }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\nheader .main-header {\n  background-image: url(" + __webpack_require__(20) + ");\n  background-size: cover;\n  padding: 0;\n  width: 100%; }\n\nimg {\n  width: 100%; }\n\n.container-fluid.no-padding {\n  padding: 0; }\n\nmain {\n  padding: 15px; }\n", ""]);

	// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f4769f9bdb7466be65088239c12046d1.eot";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "448c34a56d699c29117adc64c43affeb.woff2";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fa2772327f55d8198301fdb8bcfc8158.woff";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e18bbf611f2a2e43afc071aa2f4e1512.ttf";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "89889688147bd7575d6327160d64e760.svg";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a6c51ab9e7e36119d9002d861fe7c95a.png";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
]);