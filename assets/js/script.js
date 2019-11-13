$(document).ready(intializeApp);

function intializeApp(){
  $(".card").on('click', handleCardClick);
}

function handleCardClick(event){
    var target = $(event.currentTarget);
    var front = target.find(".front");
    var back = target.find(".back");
    console.log(front);
    front.removeClass("hide");
    back.addClass("hide");
}
