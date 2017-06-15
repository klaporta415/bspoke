var hereRoute = function(start,end){

  if (document.querySelector('input[name = "avoid"]:checked') != null){
  // var avoidSelection = document.querySelector('input[name = "avoid[]"]:checked').value
  // console.log(avoidSelection);
  var avoidSelection = $("#avoid-selector form").serialize();
    console.log(avoidSelection)
  }
  else{avoidSelection = "avoid=everything"}


  $.ajax({
    method: "GET",
    url: "/pins",
    data: {avoid: avoidSelection}
    })
    .done(function(response){
      var avoidArray = generateBuddyPins(response);
      // generate url
      var hereURL = avoidQueryString(avoidArray, start, end)

      $.ajax({
        method: 'post',
        url: hereURL
      })
        .done(function(response){
          console.log(response);
          $('#map-page').empty();
          var maneuverArray = generateManeuverArray(response);
          var pathArray = generateRouteForGoogle(maneuverArray);
          var gURL = generateURLForGoogleRoute(maneuverArray);
          var gURLString = '<a href=' + gURL + '>Take me there!</a>'
          $('#google-link').empty();
          $('#map-page').append(gURLString);


          var googleLink = document.getElementById('google-link');


          var div = document.createElement('div');
          div.innerHTML = '<a href=' + gURL + '>Take me there!</a>';
          googleLink.appendChild(div);

          map.controls[google.maps.ControlPosition.CENTER].push(googleLink);


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

function generateManeuverArray(response){
  var coordinates = []
  var maneuverArray = response.response.route[0].leg[0].maneuver
  for(var i = 0; i < maneuverArray.length; i++) {
      coordinates.push([maneuverArray[i].position.latitude, maneuverArray[i].position.longitude]);
  }
  return coordinates;
}

function generateRouteForGoogle(maneuverArray){
  var pathArray = [];

  routePath.setMap(null);

    for(var i = 0; i < maneuverArray.length; i++){
      pathArray.push(new google.maps.LatLng(maneuverArray[i][0], maneuverArray[i][1]));
    }

    routePath.setPath(pathArray)

   //  routePath.addListener('click', function() {
   // //     infowindow.open(marker.get('map'), marker);
   // alert("Path Clicked")
   // });

  routePath.setMap(map);
  return pathArray;
}

function generateURLForGoogleRoute(maneuverArray){
  var gURL = "https://www.google.com/maps/dir/?api=1&travelmode=bicycling&origin=" + maneuverArray[0][0] + ',' + maneuverArray[0][1] + "&destination=" + maneuverArray[maneuverArray.length - 1][0] + ',' + maneuverArray[maneuverArray.length - 1][1] + "&waypoints="
    for(var locationInfo in maneuverArray){
      if(locationInfo != 0 && locationInfo != maneuverArray.length - 1) {
        gURL = gURL + maneuverArray[locationInfo][0] + ',' + maneuverArray[locationInfo][1] + '|'
      }
    }
    gURL = gURL.slice(0, -1);
    return gURL;
}




