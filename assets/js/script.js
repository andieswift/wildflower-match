$(document).ready(intializeApp);

let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
const max_matches = 9;
let attemps = null;
let games_played = 0;
let lockGame = false;

let classArray = ["flower1", "flower2", "flower3", "flower4", "flower5", "flower6",
                  "flower7", "flower8", "flower9", "flower1","flower2", "flower3",
                  "flower4", "flower5", "flower6", "flower7", "flower8", "flower9"];

let indexStart = 0;
let speed = 100;
let indexEnd = 0;

function intializeApp(){
  createCard();
  $(".container").on('click','.card', handleCardClick);
  $("#reset_btn").on('click', resetGame);
}


function handleCardClick(event){
  if(lockGame || firstCardClicked !== null && secondCardClicked !== null){
    return;
  }
  let $target = $(event.currentTarget);
  $target.addClass("clicked");
  $target.addClass("unclickable");
  if($target.find(".back").hasClass('clicked')){
    return;
  }

  let front = $target.find(".front");
  let back = $target.find(".back");


  if(!firstCardClicked){
    firstCardClicked = $target;

  }

  else{
    secondCardClicked = $target;
    attemps++;

    let firstFront = firstCardClicked.find(".front");
    let secondFront = secondCardClicked.find(".front");
    let firstCardClickedURL = firstFront.css("background-color");
    let secondCardClickedURL = secondFront.css("background-color");
      if(firstCardClickedURL === secondCardClickedURL){
        matches++;
        let cardName = front.attr('class');
        firstCardClicked = null;
        secondCardClicked = null;
        if(matches === max_matches){
          setTimeout(endGameModal, 1500);
          games_played++;
        }
      }
      else {
        lockGame = true;
        setTimeout(hideFrontCard, 1500);
        firstCardClicked.removeClass("unclickable");
        secondCardClicked.removeClass("unclickable");

      }
    displayStats();
  }


  function endGameModal(){
    $("#end-game").removeClass("hide")
  }

  function hideFrontCard() {
    firstCardClicked.removeClass("clicked");
    secondCardClicked.removeClass("clicked");

    firstCardClicked = null;
    secondCardClicked = null;
    lockGame = false;
  }
}


function resetGame(){
  $(".modal").addClass("hide");
  matches = 0;
  attemps = 0;

  displayStats();
  $("#Accuracy p").text("0%");
  $(".container").empty();
  createCard();
  $(".start-game").removeClass("hide");

}


function calculateAccuracy(){
  let accuracy = matches/attemps;
  accuracy = Math.round(10000 * accuracy) / 100;
  let accuracyStr = accuracy + '%';
  return accuracyStr;
}


function displayStats(){
  let accuracy = calculateAccuracy();
  $("#games_played p").text(games_played);
  $("#attemps p").text(attemps);
  $("#Accuracy p").text(accuracy);
}

function createCard(){
  let arr = shuffle(classArray);
  let container = $(".container");
  for(let index=0; index< arr.length; index++){
    let sceneDiv = $("<div>").addClass("scene");
    let currentCard = $("<div>").addClass("card");
    let classCard = arr[index];
    let frontCard = $("<div>").addClass("front " + classCard);
    let backCard = $("<div>").addClass("back");

    container.append(sceneDiv);
    sceneDiv.append(currentCard);
    currentCard.append(frontCard);
    currentCard.append(backCard);
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;


  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}
