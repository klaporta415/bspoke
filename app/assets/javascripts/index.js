
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markerArray = [];

function initMap() {
  var markerStart = { lat: 41.87661000000001, lng: -87.65071 };

  var myPosition = new google.maps.LatLng(41.87661000000001, -87.65071)

  var mapOptions = {
    zoom: 13,
    mapTypeControl: false,
    center: myPosition
  };
   map = new google.maps.Map(document.getElementById('map'), mapOptions);


  $.ajax({
    method: "GET",
    url: "/pins"
    })
    .done(function(response){
      for(var i = 0; i < response.length; i ++) {
        var marker = {lat: parseFloat(response[i]['latitude']), lng: parseFloat(response[i]['longitude'])}
        var category = response[i].category
        addSavedMarker(marker, category, map);
      }
  })



  new AutocompleteDirectionsHandler(map);

  var mousedUp = false;
  google.maps.event.addListener(map, 'mousedown', function(event){
    mousedUp = false;
      var thing = $(this);

    setTimeout(function(){
      if(mousedUp === false){

      addMarker(event.latLng, map);

      }
    }, 1000);
  });
  google.maps.event.addListener(map, 'mouseup', function(event){
    mousedUp = true;
  });
  google.maps.event.addListener(map, 'dragstart', function(event){
    mousedUp = true;
  });

} //end of map init




var hereRoute = function(start,end){
  $.ajax({
    method: "GET",
    url: "/pins"
    })
    .done(function(response){

      var avoidArray = []
      for(var pin in response){
        avoidArray.push([(parseFloat(response[pin].latitude) + 0.01), (parseFloat(response[pin].longitude) + 0.01)]);
        avoidArray.push([response[pin].latitude, response[pin].longitude]);

      }
      var query = "";
      for(var location in avoidArray){

        if(location < (avoidArray.length - 1) && (location % 2 == 0)){

        query = query + avoidArray[location][0] + ',' + avoidArray[location][1] + ';' + avoidArray[(parseInt(location) + 1)][0] + ',' + avoidArray[(parseInt(location) + 1)][1] + '!';

        }
      }
      query = query.slice(0, -1);


    hereURL = "https://route.cit.api.here.com/routing/7.2/calculateroute.json?app_id=9mBaxBeJ7mApiH1ztTZo&app_code=5yfWfBxENAXQsu5zhv6Lcw&waypoint0=geo!"+ start[0] + ',' + start[1] + "&waypoint1=geo!"+ end[0] + ',' + end[1] + "&mode=fastest;bicycle;traffic:disabled&avoidareas=" + query;
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



function addSavedMarker(location, category,  map) {
  console.log(category)

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    general: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    smells: {
      icon: iconBase + 'library_maps.png'
    },
    pothole: {
      icon: iconBase + 'info-i_maps.png'
    }
  };

  var marker = new google.maps.Marker({
  position: location,
  icon: icons[category].icon,
  map: map
  });
}

function addMarker(location, map) {

 if (document.querySelector('input[name = "type"]:checked') != null){
  var querySelection = document.querySelector('input[name = "type"]:checked').value
 }
 else{var querySelection = "general"}

  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
  var pin = new Pin({latitude: marker['position'].lat(), longitude: marker['position'].lng(), category: querySelection});
  $.ajax({
    url: '/pins',
    method: 'post',
    data: {pin: pin}
  })
  .done(function(response){
  })

  markerArray.push([marker['position'].lat(),marker['position'].lng()])
}


/**
* @constructor
*/
function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'BICYCLING';
  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  var modeSelector = document.getElementById('mode-selector');

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);

  var originAutocomplete = new google.maps.places.Autocomplete(
      originInput, {placeIdOnly: true});
  var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput, {placeIdOnly: true});

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    me.route();
  });

};

AutocompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    provideRouteAlternatives: false,
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {

        var routePoints = response['routes'][0].overview_path
            var start = ([routePoints[0].lat(), routePoints[0].lng()])
            var end = ([routePoints[routePoints.length - 1].lat(), routePoints[routePoints.length - 1].lng()])
            var adjustedRoute = hereRoute(start , end);
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};


