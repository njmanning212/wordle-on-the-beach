/*------------ Constants ------------*/


/*------------ Variables ------------*/

let secretWord, guessNumber, guessedLetter, guessedWord


/*---- Cached Element References ----*/
const guessBoardArrStart = Array.from(document.querySelectorAll('.guess-word'))
const guessBoardArr = guessBoardArrStart.map (function (word) {
    let wordGuess = Array.from(word.querySelectorAll('.guess-letter'))
    return wordGuess
})

// .map(word => Array.from(word.querySelectorAll('.guess-letter')))
console.log(guessBoardArr)

const resetBtn = document.getElementById('reset-button')


/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', init)

/*------------ Functions ------------*/

init ()

function init () {
    secretWord = 'ariel'
    guessNumber = 0
    guessedWord = [null, null, null, null, null]
}