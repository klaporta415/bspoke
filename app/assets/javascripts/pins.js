var Pin = function(locationDetails) {
  this.latitude = locationDetails.latitude,
  this.longitude = locationDetails.longitude
  this.category = locationDetails.category
}

function addPinsToMap() {
    $.ajax({
    method: "GET",
    url: "/pins",
    data: {avoid: 'avoid=everything'}
    })
    .done(function(response){
      for(var i = 0; i < response.length; i ++) {
        var markerObject = response[i]
        var marker = {lat: parseFloat(response[i]['latitude']), lng: parseFloat(response[i]['longitude'])}
        var category = response[i].category
        addSavedMarker(markerObject, marker, category, map);
      }

  })
}


// contains marker images, saves marker
function addSavedMarker(markerObject, location, category,  map) {
  var marker = new google.maps.Marker({
  position: location,
  icon: pinImages[category].icon,
  map: map,
  title: category
  });

 var infowindow = new google.maps.InfoWindow({
    content: '<h2>' + markerObject.title + '</h2>' +
      '<p>' + markerObject.comment + '</p>'
    });


      marker.addListener('click', function() {
          infowindow.open(map, marker);
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

function addMarker(event, map) {
  console.log("event was triggered and in addMarker")

  var mainEvent = event

  console.log(event.latLng.lat())
  console.log(event.latLng.lng())

    var eventLat = event.latLng.lat()
    var eventLng = event.latLng.lng()

    var pinInputDiv = document.getElementById('form-pin-div');

    // '<select id="pin-select" name="type">' +
    //         '<option selected disabled>Select Pin Type</option>' +
    //         '<option id="changermarker-general" value="general">other</option>' +
    //         '<option id="changermarker-smell" value="smell">smell</option>' +
    //         '<option id="changermarker-goose" value="goose">goose</option>' +
    //         '<option id="changermarker-event" value="event">event</option>' +
    //         '<option id="changermarker-road-condition" value="roadCondition">road</option>' +
    //       '</select>'

     var contentString = '<form id="pin-info-form" class="controls">' +
    '<input id="title-input" type="text" name="title" placeholder="Enter Pin Title">' +
     '<input id="comment-input" type="text" name="comment" placeholder="Enter Pin Comment">' +
      '<select id="pin-select" name="type">' +
            '<option selected disabled>Select Pin Type</option>' +
            '<option id="changermarker-general" value="general">other</option>' +
            '<option id="changermarker-smell" value="smell">smell</option>' +
            '<option id="changermarker-goose" value="goose">goose</option>' +
            '<option id="changermarker-event" value="event">event</option>' +
            '<option id="changermarker-road-condition" value="roadCondition">road</option>' +
          '</select>' +
     '<input id="pin-form-button" type="button", value="click">' +
    '</form>';

    var div = document.createElement('div');

    div.innerHTML = contentString

    pinInputDiv.appendChild(div);

    console.log(pinInputDiv)

    map.controls[google.maps.ControlPosition.CENTER].push(pinInputDiv);


              $('#pin-info-form').on('click', '#pin-form-button', function(e) {
            console.log("form was clicked")
            // console.log(mainEvent)
            var pinTitle = $('#title-input').val()
            var pinComment = $('#comment-input').val()
            console.log(eventLat)
            console.log(eventLng)

            var querySelection = $('#pin-select').val()

            if (querySelection == null) {
              querySelection = "general"
            }

              console.log(querySelection)


          var pin = new Pin({latitude: eventLat, longitude: eventLng, category: querySelection, title: "PINTITLE", comment: "PINCOMMENT"});



            $.ajax({
              url: '/pins',
              method: 'post',
              data: {pin: pin}
              })
             .done(function(response){
               $('#form-pin-div').children().remove()

               // var infowindow = new google.maps.InfoWindow();

               var marker = new google.maps.Marker({
               position: mainEvent.latLng,
               icon: pinImages[querySelection].icon,
               map: map,
               title: pin.category
               });

                  var infowindow = new google.maps.InfoWindow({
                   content: '<h2>' + pinTitle + '</h2>' +
                            '<p>' + pinComment + '</p>'
                  });





      marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
             // console.log(response);
             })
              .fail(function(failure){
              console.log(failure);
              window.confirm("Must login to add pins!");
              window.location.href='/users/sign_in';
              })






          });







 // var querySelection = $('#pin-select').val()

 // if (querySelection == null) {
 //  querySelection = "general"
 // }

 // // if (document.querySelector('input[name = "type"]:checked') != null){
 // //  var querySelection = document.querySelector('input[name = "type"]:checked').value

 // // }
 // // else{var querySelection = "general"}



 //  console.log(querySelection)

  // var pin = new Pin({latitude: location.lat(), longitude: location.lng(), category: querySelection});
  // $.ajax({
  //   url: '/pins',
  //   method: 'post',
  //   data: {pin: pin}
  // })
  // .done(function(response){
  //   var marker = new google.maps.Marker({
  //     position: location,
  //     icon: pinImages[querySelection].icon,
  //     map: map,
  //     title: pin.category
  //   });

  //  marker.addListener('click', function() {
  //  //     infowindow.open(marker.get('map'), marker);
  //  alert("marker was clicked")
  //  });
  //   // console.log(response);
  // })
  // .fail(function(failure){
  //   console.log(failure);
  //   window.confirm("Must login to add pins!");
  //   window.location.href='/users/sign_in';
  // })
  // markerArray.push([marker['position'].lat(),marker['position'].lng()])
}

function pinClickEvent(){
  var mousedUp = false;
  google.maps.event.addListener(map, 'mousedown', function(event){
    mousedUp = false;

    setTimeout(function(){
      if(mousedUp === false){
        addMarker(event, map);
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
