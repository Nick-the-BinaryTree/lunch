/* lunchAPI.js -- Incorporates communication with the server into "lunch?"
 *
 * Written by:  Nick Hartunian and James Garijo-Garde
 *         for: AngelHack 2018
 *         on:  5/19/2018 - 5/20/2018
 */

/* id: A user's numerical identifier.  */
var id = null;

/***** MAIN *******************************************************************/

// On end of Step 1:
$('#submitName').click(function() {
    $.post('http://localhost:3000/user/new',
      { name: $('#nameBox').val() },
      function(data) { id = data.id; },
      'json'
    )
})

// TODO wrap in "choose venues" button click like above later
function setPrefs(prefs) {
  $.post('http://localhost:3000/user/'+id,
    { prefers: prefs },
    function(data) { enterSearchMode(); },
    'json'
  )
}

// TODO wrap in "search" button click
function enterSearchMode() {
  var count = 0;
  console.log("got to search mode");
  var intervalId = setInterval(function() {
    if (count >= 5){
      clearInterval(intervalId);
      return;
    }
    $.get("http://localhost:3000/user/"+id+"/search", function(data) {
      if (data) {
        console.log(data)
        $("#result").html("Lunch with " + data.name + " at " + data.venue);
        count = 5;
      }
    })
    count++;
  }, 2000)
}
