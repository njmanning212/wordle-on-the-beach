/*------------ Constants ------------*/


/*------------ Variables ------------*/

let secretWord, guessNumber, guessBoardArr, currentGuessWord, letterTurn

/*---- Cached Element References ----*/
const guessWords = Array.from(document.querySelectorAll('.guess-word'))
const guessLetters = document.querySelectorAll('.guess-letter')

const keyboard = document.getElementById('keyboard')
const resetBtn = document.getElementById('reset-button')
const deleteBtn = document.getElementById('delete-button')


/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', init)
keyboard.addEventListener('click', handleKeyboardClick)
deleteBtn.addEventListener('click', deleteLetter)

/*------------ Functions ------------*/

init ()

function init () {
    secretWord = 'ariel'
    //change above to function later to pull with difficult
    guessNumber = 1
    letterTurn = 0
    setBoardArr()
    clearGuesses()
    render ()
}

function render () {
    console.log(guessBoardArr)
    createCurrentGuessWord()
    resetLetterTurn()
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
    if (letterTurn < 5) {
        if (evt.target.classList.contains('letter')) {
          console.log(evt.target.id)
          currentGuessWord[letterTurn].innerText = evt.target.id.toUpperCase()
          letterTurn++
          console.log(letterTurn)
        }
    }
  }

function createCurrentGuessWord () {
    currentGuessWord = guessBoardArr[guessNumber]
    return currentGuessWord
}
  
function resetLetterTurn () {
    letterTurn = 0
}

function deleteLetter () {
    console.log(`delete letter`)
    if (letterTurn > 0){
        currentGuessWord[letterTurn-1].innerText = ''
        letterTurn = letterTurn - 1
        console.log(letterTurn)
    } 
}
