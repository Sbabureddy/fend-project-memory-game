const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let time; 
let clockOff = true;
let clockId;
let matched = 0;
let starCount;
// gathered all cards and added event listener 
deck.addEventListener('click',function(){
    const click = event.target;
    if(clockOff){
        clock();
        clockOff = false;
    }

    if(isClickValid(click)){
        openCard(click);
        addToggleCard(click);
        if(toggledCards.length === 2){
            isMatched();
            moveCounter();
            rating();
        }
    }
});
function openCard(click){
    click.classList.toggle('open');
    click.classList.toggle('show');
}
function openCard(card){
    card.classList.toggle('open');
    card.classList.toggle('show');
}
function addToggleCard(click){
    toggledCards.push(click);
}
// cards are matched
function isMatched(){
    if(toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        matched++;
        if(matched === 8){
            setTimeout(function(){
                modalBody();
                $('#exampleModal').modal('show');
                resetCards();
            },1000)
        }
        else{
            setTimeout(function(){
                $('#exampleModal').modal('show');
                gamveOverModal();
            },300000);
            
        }
        
    }
    else{
        setTimeout(function(){
            openCard(toggledCards[0]);
            openCard(toggledCards[1]);
            toggledCards = [];
        },1000)
    }
}
function isClickValid(click){
    return(
        click.classList.contains('card') && !click.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(click)
    );
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
 
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
 
    return array;
 }
 // converts node list into array and add icons randomly to DOM
function shuffleDeck(){
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    // console.log('cards to shuffle', cardsToShuffle);
    const shuffledCards = shuffle(cardsToShuffle);
    // console.log('shuffled cards', shuffledCards);
    for(card of shuffledCards){
        deck.appendChild(card);
    }
}
// move counter
function moveCounter(){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
// hideStars
function hideStar(){
    const starList = document.querySelectorAll('.stars li');
    for(star of starList){
        if(star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
    }
}
// movesCounter(checkscore)
function rating(){
    if(moves === 12 || moves === 18){
        hideStar();
    }
}
// clock start here
function clock(){
    time = 0;
    let clockId = setInterval(function(){
        time++;
        displayTime();
    },1000);
}
// function for displaying time 
function displayTime(){
    const clock = document.querySelector('.clock');
    clock.innerHTML = time;
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    if(seconds < 10){
        clock.innerHTML = `${minutes}:0${seconds}`;
    }
    else{
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}
// clock stops here
function stopClock(){
    clearInterval(clockId);
}
// game over here
function gameOver(){
    stopClock();
    setTimeout(function(){
        modalBody();
        $('#exampleModal').modal('hide');
        
    },1000)
}
//modal body for congratulation popup
function modalBody(){
    const elapsedTime = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const noOfMoves = document.querySelector('.modal_moves');
    const avgStar = document.querySelector('.modal_stars');
    const stars = getStars();
    elapsedTime.innerHTML = `Time = ${clockTime}`;
    noOfMoves.innerHTML = ` ${moves} Moves`;
    avgStar.innerHTML = ` ${stars} Stars`;
}
// gameover modal popup
function gamveOverModal(){
    document.querySelector('#exampleModalLabel').innerHTML = 'Try Again?';
    document.querySelector('#updatedBodyText').innerHTML = 'You Lost the Game! Do you want to Play Again?';

}
//reset time
function resetClockAndTime(){
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}
//reset moves
function resetMoves(){
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}
//resetgame
function resetGame(){
    resetClockAndTime();
    resetMoves();
    resetStars();
    $('#exampleModal').modal('hide')
    resetCards();
    shuffleDeck();
}
// replay button 
function replayGame(){
    $('#exampleModal').modal('hide');
    resetGame();
}
// get stars
function getStars(){
    const stars = document.querySelectorAll('.stars li');
     starCount = 0;
     for(star of stars){
         if(star.style.display !== 'none'){
             starCount++;
         }
     }
     return starCount;
 }
//reset stars
function resetStars(){
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for(star of starList){
        star.style.display = 'inline';
    }
}
//reset cards
function resetCards(){
    const cards = document.querySelectorAll('.deck li');
    for(let card of cards){
        card.className = 'card';
    }
}

// modal reset button
const resetbtn = document.querySelector('.modal_replay').addEventListener('click', replayGame);
//
const replaybtn = document.querySelector('.restart').addEventListener('click', resetGame);