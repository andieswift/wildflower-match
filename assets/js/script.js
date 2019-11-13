$(document).ready(intializeApp);

//VARIABLES
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function intializeApp(){
  $(".card").on('click', handleCardClick);
}

//stores card clicked and checks if they match
function handleCardClick(event){
    var target = $(event.currentTarget);
    var front = target.find(".front");
    var back = target.find(".back");
    front.removeClass("hide");
    back.addClass("hide");

    if(!firstCardClicked){
      firstCardClicked = target;
    }
    else{
      secondCardClicked = target;

      //checking if the cards match
      var firstFront = firstCardClicked.find(".front");
      var secondFront = secondCardClicked.find(".front");
      var firstCardClickedURL = firstFront.css("background-image");
      var secondCardClickedURL = secondFront.css("background-image");
         if(firstCardClickedURL === secondCardClickedURL){
            console.log("cards match");
            matches++;
          }
          else{
            console.log("cards don't match");
            setTimeout(hideFrontCard, 1500)
          }
    }

  function hideFrontCard() {
    var firstBack = firstCardClicked.find(".back");
    var secondBack = secondCardClicked.find(".back");
    firstBack.removeClass("hide");
    firstFront.addClass("hide");
    secondBack.removeClass("hide");
    secondFront.addClass("hide");
  }

}
