var markerArray = [];

function initMap() {
  var myPosition = new google.maps.LatLng(41.87661000000001, -87.65071)

  var mapOptions = {
    zoom: 13,
    mapTypeControl: false,
    center: myPosition
  };
   map = new google.maps.Map(document.getElementById('map'), mapOptions);

   routePath = new google.maps.Polyline({
      path: []
    });

   // ajax call loads pins saved in database
   addPinsToMap();
    // autocomplete bars for start and end
  new AutocompleteDirectionsHandler(map);

  // add pin to map by click and hold for 1sec
  pinClickEvent();

} //end of map init

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


