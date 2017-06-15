$(document).ready(function(){
      $('#about-page').closest('div').addClass('hidden');

  $("#about").on("click", function(event){
    event.preventDefault();
    console.log("hiiii");
    $.ajax({
      url: '/home/about',
      method: 'get'
    })
    .done(function(response){
      console.log(response);
      if($("#about-page").hasClass('hidden')){
        $('#about-page').closest('div').removeClass('hidden');
      } else {
        $('#about-page').closest('div').addClass('hidden');
      }
    })
    // if ($(".about-page").is("hidden")){
    //   $(".about-page").slideDown("slow");
    // } else {
    //   $(".about-page").slideUp("slow")
    // }
  });
})
