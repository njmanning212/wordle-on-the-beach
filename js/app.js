/*------------ Constants ------------*/


/*------------ Variables ------------*/

let secretWord, guessNumber, guessedWord, guessBoardArr
let currentGuessWord

/*---- Cached Element References ----*/
const guessWords = Array.from(document.querySelectorAll('.guess-word'))
const guessLetters = document.querySelectorAll('.guess-letter')

const keyboard = document.getElementById('keyboard')
const resetBtn = document.getElementById('reset-button')


/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', init)
keyboard.addEventListener('click', handleKeyboardClick)

/*------------ Functions ------------*/

init ()

function init () {
    secretWord = 'ariel'
    //change above to function later to pull with difficult
    // guessNumber = 1
    setBoardArr()
    clearGuesses()
    render ()
}

function render () {
    guessNumber = 0
    console.log(guessBoardArr)
    createCurrentGuessWord()
    console.log(currentGuessWord)
}


function setBoardArr () {
    guessBoardArr = guessWords.map (function (word) {
        let wordGuess = Array.from(word.querySelectorAll('.guess-letter'))
        return wordGuess
    })
}

function clearGuesses () {
    guessBoardArr.forEach(function (word){
        word.forEach(function (letter){
            letter.textContent = ''
        })
    })
}

function handleKeyboardClick(evt) {
    if (evt.target.classList.contains('letter')) {
      console.log(evt.target.id);
    }
  }

function createCurrentGuessWord () {
    currentGuessWord = guessBoardArr[guessNumber]
    return currentGuessWord
}
  