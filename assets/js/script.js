$(document).ready(intializeApp);

//VARIABLES
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;

function intializeApp(){
  $(".card").on('click', handleCardClick);
  $("#close_btn").on('click', closeModal);
  $("#reset_btn").on('click', resetGame);
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
            matches++;
            firstCardClicked = null;
            secondCardClicked = null;
            //checks if they got all the matches
           if(matches === max_matches){
                  console.log('YOU WIN');
                  $(".modal").removeClass("hide")
                }

          }
          else{
             setTimeout(hideFrontCard, 1500);

          }



    }

  function hideFrontCard() {
    var firstBack = firstCardClicked.find(".back");
    var secondBack = secondCardClicked.find(".back");
    firstBack.removeClass("hide");
    firstFront.addClass("hide");
    secondBack.removeClass("hide");
    secondFront.addClass("hide");
    firstCardClicked = null;
    secondCardClicked = null;


  }


}

//Close modal
function closeModal(){
  $(".modal").addClass("hide");
}

//reset game
function resetGame(){
  closeModal();
  var front = $(".card").find(".front");
  var back = $(".card").find(".back");
  back.removeClass("hide");
  front.addClass("hide");
  matches = 0;
}
