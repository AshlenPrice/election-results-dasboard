'use strict';

// imports parsed JSON file
import cycleOne from '../data/results_2004.json';
import cycleTwo from '../data/results_2008.json';
import cycleThree from '../data/results_2012.json';

// empty object to push new data into
const twoThousandAndFourCycle = new Object()
const twoThousandAndEightCycle = []
const twoThousandAndTwelveCycle = []

for (let state in cycleOne){
   if (cycleOne.hasOwnProperty(state)) {
      //  console.log(cycleOne[state]);
     for (let candidate in cycleOne[state]){
       if(cycleOne[state].hasOwnProperty(candidate)){
              //  console.log(cycleOne[state][candidate]);
         const electObj = cycleOne[state][candidate];
        //  console.log(electObj);

        //  twoThousandAndFourCycle.push(electObj);
        //  console.log(twoThousandAndFourCycle);
       }
         }
     }
 }








module.exports = true;
