/*------------ Constants ------------*/


/*------------ Variables ------------*/

let secretWord, guessNumber, guessedLetter, guessedWord, guessBoardArr


/*---- Cached Element References ----*/
const guessWords = Array.from(document.querySelectorAll('.guess-word'))
const guessLetters = document.querySelectorAll('.guess-letter')
const resetBtn = document.getElementById('reset-button')


/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', init)

/*------------ Functions ------------*/

init ()

function init () {
    setBoardArr()
    clearGuesses()
    //change to function later to pull with difficulty
    secretWord = 'ariel'
    guessNumber = 0
    guessedWord = [null, null, null, null, null]
}

console.log(guessBoardArr)

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