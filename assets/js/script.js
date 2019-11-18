$(document).ready(intializeApp);

//VARIABLES
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attemps = null;
var bellsCount = 0;
var games_played = 0;
var lockGame = false;
var classArray = ["apple", "apple", "banana", "banana", "orange", "orange", "seaBass", "seaBass", "shark",
                  "shark", "bee", "bee", "butterfly", "butterfly", "hornedAtlas", "hornedAtlas",
                 "redSnapper", "redSnapper"];
var costOfItems = [
           {name: "front apple", bells: 500 }, { name: "front banana", bells: 500 }, { name: "front orange", bells: 500},
           {name: "front seaBass", bells: 160}, {name: "front shark", bells: 15000}, {name: "front bee", bells: 2500},
           {name: "front butterfly", bells: 2500}, {name: "front hornedAtlas", bells: 8000}, {name: "front redSnapper", bells: 3000}
                    ];

function intializeApp(){

  createCard();
  $(".start-game").on('click', hideTom);
  $(".container").on('click','.card', handleCardClick);
  $("#close_btn").on('click', closeModal);
  $("#reset_btn").on('click', resetGame);


}

//stores card clicked and checks if they match
function handleCardClick(event){
  if(lockGame){
    return;
  }
  var target = $(event.currentTarget);

  if(target.find(".back").hasClass('hide')){
    return;
  }
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
      attemps++;
      //checking if the cards match
      var firstFront = firstCardClicked.find(".front");
      var secondFront = secondCardClicked.find(".front");
      var firstCardClickedURL = firstFront.css("background-image");
      var secondCardClickedURL = secondFront.css("background-image");
         if(firstCardClickedURL === secondCardClickedURL){
            matches++;
            var cardName = front.attr('class');
            firstCardClicked = null;
            secondCardClicked = null;
            bellsCount += matchBellsToItem(cardName);
            //checks if they got all the matches
           if(matches === max_matches){
                  $("#end-game").removeClass("hide");
                  games_played++;
                }

          }
          else{
            lockGame = true;
             setTimeout(hideFrontCard, 1500);

          }


        displayStats();
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
    lockGame = false;
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
  attemps = 0;
  $("#Accuracy").text("0%");
  $("#attemps").text(attemps);
  $(".container").empty();
  createCard();
  $(".start-game").removeClass("hide");
  bellsCount = 0;
  $(".bells p").text(bellsCount);


}

function calculateAccuracy(){
  var accuracy = matches/attemps;
  accuracy = Math.round(10000 * accuracy) / 100;
  var accuracyStr = accuracy + '%';
  return accuracyStr;
}

function displayStats(){
  var accuracy = calculateAccuracy();
  $("#games_played").text(games_played);
  $("#attemps").text(attemps);
  $("#Accuracy").text(accuracy);
  $(".bells p").text(bellsCount);
}

//Dynamically create cards
function createCard(){
  //var arr = shuffle(classArray);
  var arr = classArray;
  var container = $(".container");
  for(var index=0; index< arr.length; index++){
    var currentCard = $("<div>").addClass("card");
    var classCard = arr[index];
    var frontCard = $("<div>").addClass("front hide " + classCard);
    var backCard = $("<div>").addClass("back");

    container.append(currentCard);
    currentCard.append(frontCard);
    currentCard.append(backCard);
  }
}

 function shuffle(array) {

  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}

function hideTom(){
  $(".start-game").addClass("hide");

}

function matchBellsToItem (itemClass){
  var indexOfItem = null;
  var index = 0;
  while(itemClass !== costOfItems[index].name){
    index++;
  }
  return costOfItems[index].bells;

}
