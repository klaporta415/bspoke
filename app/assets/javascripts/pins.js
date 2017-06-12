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

// contains marker images, saves marker
function addSavedMarker(location, category,  map) {
  var marker = new google.maps.Marker({
  position: location,
  icon: pinImages[category].icon,
  map: map
  });
}

pinImages = {
  general: {
    icon: 'http://res.cloudinary.com/lx9gdutds/image/upload/v1497219196/bspoke_warning_izvhrq.png'
  },
  smell: {
    icon: 'http://res.cloudinary.com/lx9gdutds/image/upload/v1497223391/smell_warning_pfms1z.png'
  },
  goose: {
    icon: 'http://res.cloudinary.com/lx9gdutds/image/upload/v1497220304/goose_warning_no_color_ze3xkp.png'
  },
  event: {
    icon: 'http://res.cloudinary.com/lx9gdutds/image/upload/v1497221277/party_warning_swwwmb.png'
  },
  roadCondition: {
    icon: 'http://res.cloudinary.com/lx9gdutds/image/upload/v1497220166/warning_cone_aw0l7w.png'
  }
};

function addMarker(location, map) {
 if (document.querySelector('input[name = "type"]:checked') != null){
  var querySelection = document.querySelector('input[name = "type"]:checked').value
 }
 else{var querySelection = "general"}

  var marker = new google.maps.Marker({
    position: location,
    icon: pinImages[querySelection].icon,
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

function pinClickEvent(){
  var mousedUp = false;
  google.maps.event.addListener(map, 'mousedown', function(event){
    mousedUp = false;

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
}
