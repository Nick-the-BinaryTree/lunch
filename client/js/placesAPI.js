// wrap in "choose venues" button click like above later

function getVenues() {
  // $.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=AIzaSyCNzDoImjaJiJiJtJwDhH3izGN2uN7-gjs',
  //   function(data) { console.log(data); },
  // )
  // console.log(gapi.client.request({
  // 'path': 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
  // 'params': {'location': '-33.8670522,151.1957362',
  //            'radius': '1500',
  //            'type': 'restaurant',
  //            'key': 'AIzaSyCNzDoImjaJiJiJtJwDhH3izGN2uN7-gjs'}
  //          }))
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

  service.nearbySearch(request, function (data) {console.log(data)});
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
