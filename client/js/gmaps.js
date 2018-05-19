/* gmaps.js -- Incorporates various aspects of the Google Maps API into "lunch?"
 *
 * Written by:  James Garijo-Garde and Nick Hartunian
 *         for: AngelHack 2018
 *         on:  5/19/2018
 */

/* location: The user's location, stored as a string.  */
var location = '';

/* latitude & longitude: The user's latitude and longitude.  */
var latitude = 0.0;
var longitude = 0.0;

/* geolocate: 
 * Uses the Google Maps API to attempt to get a user's location.
 * Relies on jQuery.  */
var geolocate = function()
{
    // TODO: Below must be converted to street address!
    latitude = $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCNzDoImjaJiJiJtJwDhH3izGN2uN7-gjs').location.lat;
};