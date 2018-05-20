var id = null;

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
    function(data) { enterSearchMode(); },
    'json'
  )
}

function search() {
  let res = null;

  $.get("http://localhost:3000/user/"+id+"/search", function(data) {
    console.log(data);
    res = data;
  })
  console.log(res)
  return res;
}

// TODO wrap in "search" button click
function enterSearchMode() {
  var count = 0;
  var intervalId = setInterval(function() {
    if (count >= 5){
      clearInterval(intervalId);
      return;
    }
    $.get("http://localhost:3000/user/"+id+"/search", function(data) {
      if (data) {
        $("#result").html("Lunch with " + data.name + " at " + data.venue);
        count = 5;
      }
    })
    count++;
  }, 2000)
}
