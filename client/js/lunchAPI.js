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
      function(data) { id = data.id; setPrefs(); },
      'json'
    )
})

// TODO wrap in "choose venues" button click like above later
function setPrefs() {
  $.post('http://localhost:3000/user/'+id,
    { prefers: ['Subway', 'Dunkin', 'Olive Garden'] },
    function(data) { console.log(data); enterSearchMode(); },
    'json'
  )
}

function search() {
  $.get("http://localhost:3000/user/"+id+"/search", function(data) {
    console.log(data)
    return data
  })
}

// TODO wrap in "search" button click
function enterSearchMode() {
  var intervalId = setInterval(function() {
    var result = search();

    if (result) {
      clearInterval(intervalId);
      console.log(result);
      return
    }
    console.log("nothing yet")
  })
}