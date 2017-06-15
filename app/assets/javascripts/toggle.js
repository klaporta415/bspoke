$(document).ready(function(){

  $("#about").on("click", function(event){
    event.preventDefault();
    console.log("hiiii");
    $.ajax({
      url: '/home/about',
      method: 'get'
    })
    .done(function(response){
      console.log(response);
      $('#about-page').closest('div').toggle();
    })
    // if ($(".about-page").is("hidden")){
    //   $(".about-page").slideDown("slow");
    // } else {
    //   $(".about-page").slideUp("slow")
    // }
  });
})
