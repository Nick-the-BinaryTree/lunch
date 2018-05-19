// wrap in "choose venues" button click like above later

function getVenues() {
  var nyc = new google.maps.LatLng(-33.8670522,151.1957362)

  var map = new google.maps.Map(document.getElementById('map'), {
      center: nyc,
      zoom: 15
    });

  var service = new google.maps.places.PlacesService(map);
  var request = {
    location: nyc,
    radius: '1500',
    type: ['restaurant']
  }

  service.nearbySearch(request, function (data) {buildOptions(data)});
}

function buildOptions(data) {
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    $('<div class="option"><label>' + data[i].name + '</label><input type="checkbox" class="option_checkbox" value="' + data[i].name + '" /></div>')
      .appendTo($('#options_container'))
  }
}

$("#prefSubmit").click(function(e) {
  e.preventDefault();
  var results = []
  $(".option_checkbox").each(function() {
    if (this.checked)
      results.push(this.value)
  })
  console.log(results)
})

getVenues()
