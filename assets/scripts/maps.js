'use strict'

const electionData = require('./data');

zingchart.THEME = "classic";
zingchart.loadModules('maps, maps-usa');

let listOfStates = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl",
                    "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la",
                    "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne",
                    "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok",
                    "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt",
                    "va", "wa", "wv", "wi", "wy"
                  ];


let elecMapData = {
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
            "items": {
            }, //items
            "tooltip": {
              "font-color": "#000",
              "font-size": 15,
              "border-width": 2,
              "border-color": "#FFF"

            },

          } //style
        } // options
      } // shape object
    ] // shapes array
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
