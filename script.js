const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const startMenu = document.getElementById('startMenu');
const startGameButton = document.getElementById('startGameButton');

const cardsArray = [
    'charlie', 'charlie', 'erica', 'erica', 'julie', 'julie', 
    'lou', 'lou', 'maria', 'maria', 'meja', 'meja',
    'milo', 'milo', 'patrik', 'patrik', 'thomas', 'thomas'
];

let flippedCards = [];
let matchedCards = [];
let timer;
let seconds = 0;

startGameButton.addEventListener('click', () => {
    startMenu.style.display = 'none'; // Göm startmenyn
    timerDisplay.style.display = 'block'; // Visa timern
    startGame(); // Starta spelet
});

restartButton.addEventListener('click', restartGame);

// Funktion för att starta spelet och timern
function startGame() {
    // Gör spelet synligt och göm startknappen
    gameBoard.style.visibility = 'visible';
    restartButton.style.display = 'none'; // Göm restart-knappen om den är synlig

    // Nollställ tid
    seconds = 0;
    timerDisplay.textContent = `Tid: ${seconds} sekunder`;

    // Starta timern
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Tid: ${seconds} sekunder`;
    }, 1000);
    
    // Blanda och lägg till korten
    const shuffledCards = shuffleArray(cardsArray);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Blanda korten
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Vända kort och visa bild
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        
        const cardValue = this.dataset.cardValue;
        // Byt ut cover.jpg mot den riktiga bilden
        this.style.backgroundImage = `url('images/${cardValue}.jpg')`;
        this.style.backgroundSize = 'cover';
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Kontrollera om korten matchar
function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.cardValue === card2.dataset.cardValue) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cardsArray.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            card1.style.backgroundImage = `url('images/cover.jpg')`;
            card2.style.backgroundImage = `url('images/cover.jpg')`;
            flippedCards = [];
        }, 1000);
    }
}

// Funktion för att avsluta spelet
function endGame() {
    clearInterval(timer);
    setTimeout(() => {
        alert(`Grattis! Du klarade spelet på ${seconds} sekunder!`);
        restartButton.style.display = 'block'; // Visa "Starta om"-knappen
    }, 500);
}

// Funktion för att starta om spelet
function restartGame() {
    // Töm spelbrädet
    gameBoard.innerHTML = '';
    
    // Nollställ kort och matcher
    flippedCards = [];
    matchedCards = [];
    
    // Starta spelet igen
    startGame();
}
