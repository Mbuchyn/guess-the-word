const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
const guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;

    const goodGuess = validatePlayerInput(guess);
   
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Oops! Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Oops! Please enter only 1 letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Oops! Please enter one letter from A-Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Please try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateRemainingGuesses(guess);
        playerGuesses();
    updateWordInProgress(guessedLetters);
    }
};

const playerGuesses = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const unveilWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            unveilWord.push(letter.toUpperCase());
        } else {
            unveilWord.push("●");
        }
    }
    // console.log(unveilWord);
    wordInProgress.innerText = unveilWord.join("");

    checkIfWin();
};


const updateRemainingGuesses = function (guess) {
    const upperCaseWord = word.toUpperCase();
    if (!upperCaseWord.includes(guess)) {
        message.innerText = `Sorry, the word has no letter ${guess}s.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yay! The word has the letter ${guess}`;
    }
    
    if (remainingGuesses === 0) {
        message.innerHTML= `GAME OVER. The word was  <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses}!`;

    } else {
        remainingGuessesSpan.innerText = `Guesses left: ${remainingGuesses}`;
    }
};


const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };