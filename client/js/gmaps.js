/* gmaps.js -- Incorporates various aspects of the Google Maps API into "lunch?"
 *
 * Written by:  James Garijo-Garde and Nick Hartunian
 *         for: AngelHack 2018
 *         on:  5/19/2018
 */

/* map: The Google Maps object.  */
var map;

/* location: The user's location, stored as a string.  */
var location;

/* latitude & longitude: The user's latitude and longitude. By default, this is
 * set to   */
var latitude = 40.71, longitude = -74.01;

/* geolocate:
 * Uses the Google Maps API to attempt to get a user's location.
 * Relies on jQuery.  */
function geolocate()
{
    console.log(latitude);
    console.log(longitude);
    latitude = parseFloat($.post('https://www.googleapis.com/geolocation/v1/geolocate?key=YOURAPIKEY').location.lat);
    longitude = parseFloat($.post('https://www.googleapis.com/geolocation/v1/geolocate?key=YOURAPIKEY').location.lng);
    console.log(latitude);
    console.log(longitude);
}


/* initMap:
 * Uses the Google Maps API to initialize a map in the "map" div element. This
 * code is a modified version of example code found here: https://goo.gl/xH8j99
 */
function initMap()
{
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 8  // this may need to be played with
  });
}

/* address:
 * Gets a text address using the latitude and longitude. Uses the Google Maps
 * API for reverse-geocoding.  */
function address()
{
    location = parse($post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=YOURAPIKEY').results[0].formatted_address);
}

/* plusser:
 * Converts the spaces in a location string into plusses.  */
function plusser()
{
    var locPlus = location;
    for (var i = 0; i < locPlus.length; i++) {
        // if (locPlus[i] === ',')  i = i+1;  // Shouldn't be needed
        if (locPlus[i] === ' ')  locPlus[i] = '+';
    }
    return locPlus;
}

/* coordinates:
 * Gets numerical coordinates using the written address. Uses the Google Maps
 * API for geocoding.  */
function coordinates()
{
    var temp = plusser();
    latitude = parseFloat($.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + temp +'&key=YOURAPIKEY').results[0].geometry.lat);
    longitude = parseFloat($.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + temp +'&key=YOURAPIKEY').results[0].geometry.lng);
}



/***** MAIN *******************************************************************/

// On end of Step 1:  // NOTE: Step 2 is bypassed here!
$('#submitName').click(function() {
  $('#step1').hide();
  $('#step3').show();
    // geolocate();  // Disabled to reduce API calls
    // address();  // Disabled to reduce API calls
    //$('#mapBox').value(location);
    initMap();
})

// Step 2 would go here

/* // Sets up the map after the user inputs an address. This is a part of Step 3.
$('#mapIt').click(function() {
    location = $('#mapBox').val();
    console.log(location);
    // coordinates();
    // initMap();
}) */

// On end of Step 3:
$('#prefSubmit').click(function() {
  $('#step3').hide();
  $('#step4').show();
})
