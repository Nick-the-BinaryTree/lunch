// wrap in "choose venues" button click like above later

function getVenues() {
  var nyc = new google.maps.LatLng(40.71 , -74.01)

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
    $('<div class="option"><label>' + data[i].name + '</label></div>')
      .appendTo($('#options_container'))
  }
  $(".option").click(function(e) {
    $(this).toggleClass("option_picked")
  });
}

$("#prefSubmit").click(function(e) {
  e.preventDefault();
  var results = [];
  $(".option_picked").each(function() {
      results.push(this.children[0].innerText)
  });
  setPrefs(results)
})

getVenues()
