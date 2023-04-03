/*------------ Constants ------------*/
import {getWord, checkWord} from "./data.js"

/*------------ Variables ------------*/

let secretWord, guessNumber, guessBoardArr, currentGuessWord, letterTurn, win, hintsAvailable, hintPool

/*---- Cached Element References ----*/
const guessWords = Array.from(document.querySelectorAll('.guess-word'))
const guessLetters = document.querySelectorAll('.guess-letter')
const keyboard = document.getElementById('keyboard')
const resetBtn = document.getElementById('reset-button')
const deleteBtn = document.getElementById('delete-button')
const sumbitBtn = document.getElementById('submit-button')
const keyBoardLetters = document.querySelectorAll('.letter')
const difficultySelector = document.getElementById('difficulty-selector')
const modal = document.getElementById('modal')
const streakNumber = document.getElementById('streak-number')
const hintBtn = document.getElementById('hint-button')

/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', resetGame)
keyboard.addEventListener('click', handleKeyboardClick)
deleteBtn.addEventListener('click', deleteLetter)
sumbitBtn.addEventListener('click', submitGuess)
difficultySelector.addEventListener('change', selectDifficulty)
modal.addEventListener('click', closeModal)
hintBtn.addEventListener('click', giveHint)


/*------------ Functions ------------*/

init ()

function init () {
    secretWord = getWord(1)
    hintPool = secretWord.split('')
    guessNumber = 0
    letterTurn = 0
    win = false
    hintsAvailable = 1
    setBoardArr()
    clearGuesses()
    resetBackground()
    render ()
}

function resetGame () {
    if (win === false) {
        updateStreakNumber('zero')
    }
    init()
}

function render () {
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
        return guessArr
    })
    let isItARealWord = guessArr.join('')
    if (!checkWord(isItARealWord)){
        notARealWord (isItARealWord)
        return
    }
    let secretArr = secretWord.split('')
    compareArr(secretArr, guessArr)
    checkForWin (secretArr, guessArr)
    checkForLoss ()
}

function compareArr (secretArr, guessArr) {
    let compareSecretArr = [...secretArr]
    guessArr.forEach(function (guessedLetter, idx){
        let secretIdx = compareSecretArr.findIndex(letter => letter === guessedLetter)
        if (compareSecretArr.includes(guessedLetter) && idx === secretIdx) {
            let color = 'gold'
            currentGuessWord[idx].style.backgroundColor = color 
            updateKeyboard (guessedLetter, color)
            spliceHintPool (guessedLetter)
            compareSecretArr[secretIdx] = 'null'
        } else if (compareSecretArr.includes(guessedLetter)){
            let color = 'red'
            currentGuessWord[idx].style.backgroundColor = color
            updateKeyboard (guessedLetter, color)
            spliceHintPool(guessedLetter)
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
        if (letter.id === guessedLetter){
            if (letter.style.backgroundColor !== 'gold'){
                letter.style.backgroundColor = color 
            }
        }
    })
}

function checkForWin (secretArr, guessArr) {
    let secretArrWord = secretArr.join('')
    let guessArrWord = guessArr.join('')
    if (secretArrWord === guessArrWord){
        userWins (secretArrWord)
    } else {
        increaseGuessNum()
        render()
    }
}

function increaseGuessNum () {
    guessNumber++
}

function checkForLoss () {
    if (guessNumber === 6) {
        userLoses(secretWord)
    }
}

function selectDifficulty (evt) {
    if (win === false) {
        updateStreakNumber('zero')
    }
    const selectedDifficulty = parseInt(evt.target.value.replace('level ', ''))
    secretWord = getWord(selectedDifficulty)
    hintPool = secretWord.split('')
    guessNumber = 0
    letterTurn = 0
    win = false
    hintsAvailable = 0
    setBoardArr()
    clearGuesses()
    resetBackground()
    render ()
}

function notARealWord (isItARealWord) {
    modal.classList.remove('modal-off')
    modal.classList.add('modal-on')
    modal.innerHTML = 
    `
        <h2>Sorry ${isItARealWord.toUpperCase()} is not a word!</h2>
        <p></p>
        <button id="close-modal">Try Again!</button>
    `
}

function closeModal (evt) {
    if (evt.target.id === 'close-modal'){
        modal.classList.remove('modal-on')
        modal.classList.add('modal-off')
    }
}

function userWins (secretArrWord) {
    modal.classList.remove('modal-off')
    modal.classList.add('modal-on')
    modal.innerHTML = 
    `
        <h2>You did it! The word was ${secretArrWord.toUpperCase()}</h2>
        <p>Streak Updated!</p>
        <button id="close-modal">Keep Playing!</button>
    `
    win = true
    updateStreakNumber('add')
}

function updateStreakNumber (change) {
    let currentStreak = parseInt(streakNumber.innerText)
    if (change === 'add') {
        streakNumber.innerText = `${currentStreak+1}`
    } if (change === 'zero') {
        streakNumber.innerText = '0'
    }
}

function userLoses () {
    modal.classList.remove('modal-off')
    modal.classList.add('modal-on')
    modal.innerHTML = 
    `
        <h2>Better Luck Next time.</h2>
        <h3>The word was ${secretWord.toUpperCase()}</h3>
        <p>Start a new streak!</p>
        <button id="close-modal">Play Again!</button>
    `
    updateStreakNumber('zero')
}

function spliceHintPool (guessedLetter) {
    hintPool.forEach(function (letter, idx){
        if (letter === guessedLetter){
            hintPool.splice(idx, 1)
        }
    })
    return hintPool
}

function giveHint () {
    if (hintsAvailable === 0){
        return
    }
    if (hintPool.length === 0) {
        return
    }
    let hintGiven = hintPool[Math.floor(Math.random() * hintPool.length)]
    keyBoardLetters.forEach(function (letter){
        if (letter.id === hintGiven) {
            letter.style.backgroundColor = 'red'
        }
    })
    hintsAvailable--
}