/*------------ Constants ------------*/


/*------------ Variables ------------*/

let secretWord, guessNumber, guessBoardArr, currentGuessWord, letterTurn

/*---- Cached Element References ----*/
const guessWords = Array.from(document.querySelectorAll('.guess-word'))
const guessLetters = document.querySelectorAll('.guess-letter')
const keyboard = document.getElementById('keyboard')
const resetBtn = document.getElementById('reset-button')
const deleteBtn = document.getElementById('delete-button')
const sumbitBtn = document.getElementById('submit-button')
const keyBoardLetters = document.querySelectorAll('.letter')


/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', init)
keyboard.addEventListener('click', handleKeyboardClick)
deleteBtn.addEventListener('click', deleteLetter)
sumbitBtn.addEventListener('click', submitGuess)

/*------------ Functions ------------*/

init ()

function init () {
    secretWord = 'ariel'
    //change above to function later to pull with difficult
    guessNumber = 1
    letterTurn = 0
    setBoardArr()
    clearGuesses()
    resetBackground()
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
          currentGuessWord[letterTurn].innerText = evt.target.id.toUpperCase()
          letterTurn++
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
    if (letterTurn > 0){
        currentGuessWord[letterTurn-1].innerText = ''
        letterTurn--
    } 
}

function submitGuess () {
    if (letterTurn !== 5) {
        return
    }
    let guessArr = []
    currentGuessWord.forEach(function (letterGuess){
        let letter = letterGuess.innerText.toLowerCase()
        guessArr.push(letter)
    })
    let secretArr = secretWord.split('')
    compareArr(secretArr, guessArr)
}

function compareArr (secretArr, guessArr) {
    console.log(guessArr)
    console.log(currentGuessWord)
    console.log(secretArr)
    guessArr.forEach(function (guessedLetter, idx){
        let secretIdx = secretArr.findIndex(letter => letter === guessedLetter)
        if (secretArr.includes(guessedLetter) && idx === secretIdx) {
            let color = 'gold'
            currentGuessWord[idx].style.backgroundColor = color 
            updateKeyboard (guessedLetter, color)
        } else if (secretArr.includes(guessedLetter)){
            let color = 'red'
            currentGuessWord[idx].style.backgroundColor = color
            updateKeyboard (guessedLetter, color)
        } else {
            let color = 'blue'
            currentGuessWord[idx].style.backgroundColor = color
            updateKeyboard (guessedLetter, color)
        }
    })
}

function resetBackground () {
    guessLetters.forEach(function (letter){
        letter.style.background = ''
    })
    keyBoardLetters.forEach(function (key){
        key.style.background = ''
    })

}

function updateKeyboard (guessedLetter, color) {
    keyBoardLetters.forEach(function (letter){
        let keyID
        if (letter.id === guessedLetter){
            if (letter.style.backgroundColor !== 'gold'){
                letter.style.backgroundColor = color 
            }
        }
    })
}
