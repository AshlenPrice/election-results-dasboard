'use strict'

// imports parsed JSON file
import cycleOne from '../data/results_2004.json'
import cycleTwo from '../data/results_2008.json'
import cycleThree from '../data/results_2012.json'

// empty object to push new data into
let twoThousandAndFourCycle = []
let twoThousandAndEightCycle = []
let twoThousandAndTwelveCycle = []

// 2004 cycle
for (let state in cycleOne){
   if (cycleOne.hasOwnProperty(state)) {
      //  console.log(cycleOne[state])
     for (let candidate in cycleOne[state]){
       if(cycleOne[state].hasOwnProperty(candidate)){
          // console.log(cycleOne[state][candidate])
let electObj = cycleOne[state][candidate]
        // console.log(electObj)
         twoThousandAndFourCycle.push(electObj)
       }
         }
     }
 }

 console.log(twoThousandAndFourCycle[2].name)

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

 let stateObj = new Object()



// 2008 cycle
 for (let state in cycleTwo){
    if (cycleTwo.hasOwnProperty(state)) {
       //  console.log(cycleTwo[state])
      for (let candidate in cycleTwo[state]){
        if(cycleTwo[state].hasOwnProperty(candidate)) {
               //  console.log(cycleTwo[state][candidate])
          let electObj = cycleTwo[state][candidate]
         //  console.log(electResutObj)
          twoThousandAndEightCycle.push(electObj)
        }
          }
      }
  }
   console.log(twoThousandAndEightCycle[0])



// 2012 cycle
  for (let state in cycleThree){
     if (cycleThree.hasOwnProperty(state)) {
        //  console.log(cycleThree[state])
       for (let candidate in cycleThree[state]){
         if(cycleThree[state].hasOwnProperty(candidate)){
                //  console.log(cycleThree[state][candidate])
          let electObj = cycleThree[state][candidate]
          //  console.log(electObj)
           twoThousandAndTwelveCycle.push(electObj)
         }
           }
       }
   }

    console.log(twoThousandAndTwelveCycle)







module.exports = true
