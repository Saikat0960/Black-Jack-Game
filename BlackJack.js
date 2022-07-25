// JavaScript source code
var suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
var values = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
var images=[]

var announcement = document.getElementById('announcement');
var introMaterial = document.getElementById('introMaterial');
var cardTable = document.getElementById('cardTable');
var newGame = document.getElementById('newgame');
var newGameButton = document.getElementById('newgameButton');
var dealButton = document.getElementById('dealButton');
var hitButton = document.getElementById('hitButton');
var stayButton = document.getElementById('stayButton');
var dealerHand = document.getElementById('dealerHand');
var playerHand = document.getElementById('playerHand');
var dealerScoreDisplay = document.getElementById('dealerScoreDisplay');
var playerScoreDisplay = document.getElementById('playerScoreDisplay');

cardTable.classList.add('hide');
dealButton.classList.add('hide');
hitButton.classList.add('hide');
stayButton.classList.add('hide');

var dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

newGameButton.addEventListener('click', function () {
    newGame.classList.add('hide');
    dealButton.classList.remove('hide');

    dealerHand.innerHTML = '';
    playerHand.innerHTML = '';
    dealerScoreDisplay.innerHTML = '';
    playerScoreDisplay.innerHTML = '';
});

dealButton.addEventListener('click', function () {
    introMaterial.classList.add('hide');
    cardTable.classList.remove('hide');
    dealButton.classList.add('hide');
    hitButton.classList.remove('hide');
    stayButton.classList.remove('hide');
    announcement.classList.add('hide');

    deck = createDeck();
    shuffleDeck(deck);

    dealerCards = [dealCard(), dealCard()];
    playerCards = [dealCard(), dealCard()];

    displayDealerHandasHidden(dealerCards);
    hasBlackJack();
})

function createDeck() {
    let deck = []
    for (let i=0; i<suits.length; i++) {
        for (let j=0; j<values.length; j++) {
            var card = {
                value: values[j],
                suit: suits[i]
            }
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i=0; i<deck.length; i++) {
        var swapCardIndex = Math.trunc(Math.random() * deck.length);
        var storedCard = deck[swapCardIndex];
        deck[swapCardIndex] = deck[i];
        deck[i] = storedCard;
    }
}

function dealCard() {
    return deck.shift();
}

hitButton.addEventListener('click', function () {
    playerCards.push(dealCard());
    displayPlayerHand(playerCards);
    if (playerScore > 21) {
        youLose();
    }
});

stayButton.addEventListener('click', function () {
    while (dealerScore < 17) {
        dealerCards.push(dealCard());
        displayDealerHand(dealerCards);
    }
    if (dealerScore > 21) {
        youWin();
    }
    else {
        findWinner();
    }
});

function displayDealerHandasHidden(cards) {
    var img = document.createElement('img');
    img.setAttribute("src", getCardImageString(cards[0]));
    document.getElementById("dealerHand").appendChild(img);

    var img1 = document.createElement('img');
    img1.setAttribute("src", "JPEG/Red_back.jpg");
    document.getElementById("dealerHand").appendChild(img1);

    if (cards[0].value == 'Ace') {
        var score = 11;
        dealerScoreDisplay.innerText = 'Score : ' + score;
    }
    else {
        var score = getCardValue(cards[0]);
        dealerScoreDisplay.innerText = 'Score : ' + score;
    }
    displayPlayerHand(playerCards);
    dealerScore = getScore(cards);
}

function displayDealerHand(cards) {
    dealerHand.innerHTML = '';
    for (var i = 0; i < cards.length; i++) {
        var img = document.createElement('img');
        img.setAttribute("src", getCardImageString(cards[i]));
        document.getElementById("dealerHand").appendChild(img);
    }
    displayDealerScore(cards);
}

function displayPlayerHand(cards) {
    playerHand.innerHTML = '';
    for (var i = 0; i < cards.length; i++) {
        var img = document.createElement('img');
        img.setAttribute("src", getCardImageString(cards[i]));
        document.getElementById("playerHand").appendChild(img);
    }
    displayPlayerScore(cards);
}

function displayDealerScore(cards) {
    dealerScore = getScore(cards);
    dealerScoreDisplay.innerText = 'Score : ' + dealerScore;
}

function displayPlayerScore(cards) {
    playerScore = getScore(cards);
    playerScoreDisplay.innerText = 'Score : ' + playerScore;
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getCardImageString(card) {
    if (card.value == "Ace" || card.value == "Jack" || card.value == "Queen" || card.value == "King") {
        return "JPEG/" + card.value.charAt(0).toString() + card.suit.charAt(0).toString() + ".jpg";
    }
    var value = getCardValue(card);
    return "JPEG/" + value.toString() + card.suit.charAt(0).toString() + ".jpg";
}

function getCardValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    var score = 0;
    var hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardValue(card);
        if (card.value == 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function youWin() {
    endGame();
    announcement.classList.remove('hide');
    announcement.innerText = 'You Win!!!  Congrats..';
    announcement.style.color = 'blue';
}

function youLose() {
    endGame();
    announcement.classList.remove('hide');
    announcement.innerText = 'You Lose!!!  Try Again..';
    announcement.style.color = 'red';
}

function youTie() {
    endGame();
    announcement.classList.remove('hide');
    announcement.innerText = 'Match Tied!!!  Try Again..';
    announcement.style.color = 'green';
}

function endGame() {
    displayDealerHand(dealerCards);
    newGame.classList.remove('hide');
    hitButton.classList.add('hide');
    stayButton.classList.add('hide');
}

function findWinner() {
    if (playerScore > dealerScore) {
        youWin();
    }
    else if (dealerScore > playerScore) {
        youLose();
    }
    else {
        youTie();
    }
}

function hasBlackJack() {
    if (playerScore == 21 && dealerScore == 21) {
        youTie();
    }
    else if (dealerScore == 21) {
        youLose();
    }
    else if (playerScore == 21) {
        youWin();
    }
}