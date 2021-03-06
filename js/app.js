//List of the cards
let cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

//Variables
let openedCards = [];
let imgFound =  0;
let counter = 0;
let gameStarted = false;
let seconds = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

//Display the cards on the page:

    //shuffle the list of cards using the "shuffle" method
cards = shuffle(cards);

    // loop through each card and create its HTML
let cardHtml = '';
for (const card of cards){  
    cardHtml += `<li class="card"><i class="${card}"></i></li>`;
}

    // add each card's HTML to the page
$('.deck').html(cardHtml);

//Flip the card when it is clicked
$('.card').on('click', function(){    
    gameStarted = true;
    if(!$(this).hasClass('open')){
        $(this).toggleClass('open show');
        openCard(this);
        gameWon();
        restart();
    };
});

//Add the card to a *list* of "open" cards 
function openCard(card) {
    
    openedCards.push(card);
    // check if open_card array contains more than one cards
    if (openedCards.length > 1) {
    // if yes check to see if the two cards match
    //if the cards do not match, remove the cards from the list and hide the card's symbol
        if ($(openedCards).hasClass('animated shake')){
                    $(openedCards).removeClass('animated shake')
                };
        if($(openedCards[0]).children().first().attr('class') !== $(openedCards[1]).children().first().attr('class')) {
            setTimeout(function(){
                $(openedCards).removeClass('open show');
                $(openedCards).addClass('animated shake');
                openedCards = [];
            }, 500);        
    //if the cards do match, lock the cards in the open position
        } else {
            $(openedCards).removeClass('animated shake');
            $(openedCards).addClass('animated flash match');
            openedCards = [];
            imgFound++;
        };
    // increment the move counter and display it on the page
    countMove();
    getStars();
    }; 
};

//Move Counter
function countMove(){
    counter ++;
    $('.moves').html(counter);  
};

//Restart the game
function restart(){
    $('.restart').on('click', function(){
        location.reload();
    });
};

//Congratulations Popup
function gameWon(){
    if (imgFound == cards.length/2){
        clearInterval(timerId);
        $('.modal-container').css('display', 'block');
        $('.modal').attr('class', 'animated bounceIn');
        $('.again-btn').on('click', function(){
            $('.modal-container').css('display', 'none');
            location.reload();
        });
        $('.no-btn').on('click', function(){
             $('.modal-container').css('display', 'none');
        });
        $('.time').html(seconds);
        if (raiting == 1){
            $('.raiting').html('<i class="fa fa-star"><i class="fa fa-star-o"><i class="fa fa-star-o">')
        } else if (raiting == 2){
            $('.raiting').html('<i class="fa fa-star"><i class="fa fa-star"><i class="fa fa-star-o">');
        } else if (raiting == 3){
            $('.raiting').html('<i class="fa fa-star"><i class="fa fa-star"><i class="fa fa-star">');
        };
    };
};

//Timer
const timerId = setInterval(function(){
    if(gameStarted != false){
        seconds++;
        $('#span-timer').html(seconds);
    };       
}, 1000);

//Star rating
let raiting;
function getStars(){    
    if(counter == 14){
        $('.score-panel li i').eq(2).removeClass('fa-star').addClass('fa-star-o');
        raiting = 2;
    } else if (counter == 20 ){
        $('.score-panel li i').eq(1).removeClass('fa-star').addClass('fa-star-o');
        raiting = 1;
    } else if (counter < 14){   
        raiting = 3;
    };   
};

