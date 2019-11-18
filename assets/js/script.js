$(document).ready(intializeApp);

//VARIABLES
//tracks cards clicked
var firstCardClicked = null;
var secondCardClicked = null;
//player matches and total matches
var matches = null;
var max_matches = 9;
var attemps = null;
//bells is animal crossing $, this keeps track of the bells the player earns
var bellsCount = 0;
var games_played = 0;
//lock game keeps player from double clicking the same card
var lockGame = false;
//added audio to the background after player starts to play
var audio = null;
//used this to dynamically create cards adding the background img, and to shuffle cards
var classArray = ["apple", "apple", "banana", "banana", "orange", "orange", "seaBass", "seaBass", "shark",
                  "shark", "bee", "bee", "butterfly", "butterfly", "hornedAtlas", "hornedAtlas",
                 "redSnapper", "redSnapper"];
//maps the card to the cost of item to increase bell count
var costOfItems = [
           {name: "front apple", bells: 500 }, { name: "front banana", bells: 500 }, { name: "front orange", bells: 500},
           {name: "front seaBass", bells: 160}, {name: "front shark", bells: 15000}, {name: "front bee", bells: 2500},
           {name: "front butterfly", bells: 2500}, {name: "front hornedAtlas", bells: 8000}, {name: "front redSnapper", bells: 3000}
                    ];

function intializeApp(){
  createCard();
  //start game modal hide content
  $(".start-game").on('click', hideTom);
  //click handler
  $(".container").on('click','.card', handleCardClick);
  //end game modal reset or hide
  $("#close_btn").on('click', closeModal);
  $("#reset_btn").on('click', resetGame);
}

//stores card clicked and checks if they match
function handleCardClick(event){
//prevents from double clikcing the same card to get a match
  if(lockGame){
    return;
  }
  var target = $(event.currentTarget);
  target.addClass("clicked");

  //makes sure the card hasn't already been clicked
  if(target.find(".back").hasClass('clicked')){
    return;
  }
    var target = $(event.currentTarget);
    var front = target.find(".front");
    var back = target.find(".back");

    //if card clicked is null set equal to target
    if(!firstCardClicked){
      firstCardClicked = target;

    }
    //otherwise set it equal to secon card clicked
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
                  //runs end game modal if they won
                  setTimeout(endGameModal, 1500);
                  games_played++;
                }
          }
          else{
            //if it isn't a matcch they are locked out of clicking until timeout ends
            lockGame = true;
            setTimeout(hideFrontCard, 1500);

          }
        displayStats();
    }

  //shows end game modal and pauses music
  function endGameModal(){
    $("#end-game").removeClass("hide")
    audio.pause();
  }

  //turns cards back over if player got match wrong
  function hideFrontCard() {
    firstCardClicked.removeClass("clicked");
    secondCardClicked.removeClass("clicked");

    firstCardClicked = null;
    secondCardClicked = null;
    lockGame = false;
  }


}

//Close modal - for both the start and end of game modal
function closeModal(){
  $(".modal").addClass("hide");
}

//reset game
function resetGame(){
  closeModal();
  //reset variables back to 0
  matches = 0;
  attemps = 0;
  bellsCount = 0;

  //resets what is displayed
  displayStats();
  //accuraccy was displaying NaN b/c it was dividing by 0
  $("#Accuracy").text("0%");
  //clears out cards
  $(".container").empty();
  //cretes new cards that
  createCard();
  //hides start game modal
  $(".start-game").removeClass("hide");

}

//calculates accuracy by dividing matches by attemps
//returns the accuracy as a string with % ready to be displayed
function calculateAccuracy(){
  var accuracy = matches/attemps;
  accuracy = Math.round(10000 * accuracy) / 100;
  var accuracyStr = accuracy + '%';
  return accuracyStr;
}

//displays all values related to the stats in the correct div
function displayStats(){
  var accuracy = calculateAccuracy();
  $("#games_played").text(games_played);
  $("#attemps").text(attemps);
  $("#Accuracy").text(accuracy);
  $(".bells p").text(bellsCount);
}

//Dynamically create cards
function createCard(){
  var arr = shuffle(classArray);
  var container = $(".container");
  for(var index=0; index< arr.length; index++){
    var sceneDiv = $("<div>").addClass("scene");
    var currentCard = $("<div>").addClass("card");
    var classCard = arr[index];
    var frontCard = $("<div>").addClass("front " + classCard);
    var backCard = $("<div>").addClass("back");

    container.append(sceneDiv);
    sceneDiv.append(currentCard);
    currentCard.append(frontCard);
    currentCard.append(backCard);
  }
}

 function shuffle(array) {

  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}

function hideTom(){
  //hides start game modal
  $(".start-game").addClass("hide");
  //starts to play music
  audio = new Audio("assets/images/153 - Tortimer Island - Hide and Seek.mp3");
  audio.play();

}

function matchBellsToItem (itemClass){
  var indexOfItem = null;
  var index = 0;
  //uses class name to find bells corlating to item
  while(itemClass !== costOfItems[index].name){
    index++;
  }
  return costOfItems[index].bells;

}
