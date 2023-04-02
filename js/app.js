/*------------ Constants ------------*/


/*------------ Variables ------------*/

let secretWord, guessNumber, guessedLetter, guessedWord



/*---- Cached Element References ----*/
const guessBoard = Array.from(document.querySelectorAll('.guess-word'))
console.log(guessBoard)


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

