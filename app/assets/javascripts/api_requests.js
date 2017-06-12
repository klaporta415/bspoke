var hereRoute = function(start,end){
  if (document.querySelector('input[name = "name"]:checked') != null){
  var avoidSelection = document.querySelector('input[name = "name"]:checked').value
  }
  $.ajax({
    method: "GET",
    url: "/pins",
    data: {avoid: avoidSelection}
    })
    .done(function(response){
      var avoidArray = generateBuddyPins(response);
      // generate url
      var hereURL = avoidQueryString(avoidArray, start, end)

    console.log(hereURL);

    var coordinates = []
    $.ajax({
      method: 'post',
      url: hereURL
    })
      .done(function(response){

        var maneuverArray = response.response.route[0].leg[0].maneuver
        for(var i = 0; i < maneuverArray.length; i++) {
          coordinates.push([maneuverArray[i].position.latitude, maneuverArray[i].position.longitude]);
        }

      var pathArray = []
        for(var i = 0; i < coordinates.length; i++){
          pathArray.push(new google.maps.LatLng(coordinates[i][0], coordinates[i][1]));
        }

    var routePath = new google.maps.Polyline({
      path: pathArray
    });
    routePath.setMap(map);

    var gURL = "https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=" + coordinates[0][0] + ',' + coordinates[0][1] + "&destination=" + coordinates[coordinates.length - 1][0] + ',' + coordinates[coordinates.length - 1][1] + "&waypoints="
    for(var locationInfo in coordinates){

      if(locationInfo != 1 && locationInfo != coordinates.length - 1) {

      gURL = gURL + coordinates[locationInfo][0] + ',' + coordinates[locationInfo][1] + '|'

      }

    }
    gURL = gURL.slice(0, -1);
    // console.log(gURL)

      })

  })
}
 //end of hereRoute function
function generateBuddyPins(response){
  var avoidArray = []
  for(var pin in response){
    avoidArray.push([(parseFloat(response[pin].latitude) + 0.001), (parseFloat(response[pin].longitude) + 0.001)]);
    avoidArray.push([response[pin].latitude, response[pin].longitude]);
  }
  return avoidArray;
}

function avoidQueryString(avoidArray, start, end){
  var query = "";
  for(var location in avoidArray){
    if(location < (avoidArray.length - 1) && (location % 2 == 0)){
      query = query + avoidArray[location][0] + ',' + avoidArray[location][1] + ';' + avoidArray[(parseInt(location) + 1)][0] + ',' + avoidArray[(parseInt(location) + 1)][1] + '!';
    }
  }
  query = query.slice(0, -1);
   var hereURL = "https://route.cit.api.here.com/routing/7.2/calculateroute.json?app_id=9mBaxBeJ7mApiH1ztTZo&app_code=5yfWfBxENAXQsu5zhv6Lcw&waypoint0=geo!"+ start[0] + ',' + start[1] + "&waypoint1=geo!"+ end[0] + ',' + end[1] + "&mode=fastest;bicycle;traffic:disabled&avoidareas=" + query;
   return hereURL;
}









