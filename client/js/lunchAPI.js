var id = null;

$('#submitName').click(function() {
  $.post('http://localhost:3000/user/new',
    { name: $('#nameBox').val() },
    function(data) { id = data.id; },
    'json'
  )
})

// wrap in "choose venues" button click like above later
function setPrefs() {
  $.post('http://localhost:3000/user/'+id,
    { prefers: ['Subway', 'Dunkin', 'Olive Garden'] },
    function(data) { console.log(data); },
    'json'
  )
}

// wrap in "search" button click
function search() {
  $.get("http://localhost:3000/user/"+id+"/search", function(data) {
    console.log(data)
  })
}
