'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');


$(() => {
  setAPIOrigin(location, config);
});

// function to handle form submission and serialization
const formSerializization = function () {
  // this part of the function throws an error when active
  //  Error may be due to .serialize() method
  // $(".debug").text($("#myForm").serialize());
  //     alert( "Thank you for your submission" );
}
$( ".btn" ).on( "submit", formSerializization );


// use require without a reference to ensure a file is bundled
require('./maps');
