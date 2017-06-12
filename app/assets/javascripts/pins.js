var Pin = function(locationDetails) {
  this.latitude = locationDetails.latitude,
  this.longitude = locationDetails.longitude
  this.category = locationDetails.category
}

function addPinsToMap() {
    $.ajax({
    method: "GET",
    url: "/pins",
    data: {avoid: 'everything'}
    })
    .done(function(response){
      for(var i = 0; i < response.length; i ++) {
        var marker = {lat: parseFloat(response[i]['latitude']), lng: parseFloat(response[i]['longitude'])}
        var category = response[i].category
        addSavedMarker(marker, category, map);
      }
  })
}
