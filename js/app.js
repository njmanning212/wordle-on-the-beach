/*------------ Constants ------------*/
import {getWord, checkWord} from "./data.js"

/*------------ Variables ------------*/

let secretWord, guessNumber, guessBoardArr, currentGuessWord, letterTurn, win, hintsAvailable, hintPool, difficulty

/*---- Cached Element References ----*/
const guessWords = Array.from(document.querySelectorAll('.guess-word'))
const guessLetters = document.querySelectorAll('.guess-letter')
const keyboard = document.getElementById('keyboard')
const resetBtn = document.getElementById('reset-button')
const deleteBtn = document.getElementById('delete-button')
const submitBtn = document.getElementById('submit-button')
const keyBoardLetters = document.querySelectorAll('.letter')
const difficultySelector = document.getElementById('difficulty-selector')
const modal = document.getElementById('modal')
const streakNumber = document.getElementById('streak-number')
const hintBtn = document.getElementById('hint-button')

/*--------- Event Listeners ---------*/

resetBtn.addEventListener('click', resetGame)
keyboard.addEventListener('click', handleKeyboardClick)
deleteBtn.addEventListener('click', deleteLetter)
submitBtn.addEventListener('click', submitGuess)
difficultySelector.addEventListener('change', selectDifficulty)
modal.addEventListener('click', closeModal)
hintBtn.addEventListener('click', giveHint)
window.addEventListener('keydown', letterKeyPressed)
window.addEventListener('keydown', deleteKeyPressed)
window.addEventListener('keydown', enterKeyPressed)

/*------------ Functions ------------*/

init (1)

function init (level) {
    secretWord = getWord(level)
    hintPool = secretWord.split('')
    guessNumber = 0
    letterTurn = 0
    win = false
    hintsAvailable = 1
    updateHintButton ()
    submitReady()
    setBoardArr()
    clearGuesses()
    resetBackground()
    render ()
}

function resetGame () {
    if (win === false) {
        updateStreakNumber('zero')
    }
    if (difficulty >= 1) {
        init(difficulty)
    } else {
        init(1)
    }
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

function letterKeyPressed (evt) {
    if (evt.keyCode > 64 && evt.keyCode < 91){
    let key = evt.key
        if (letterTurn < 5) {
          currentGuessWord[letterTurn].innerText = key.toUpperCase()
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

function deleteKeyPressed (evt) {
    if (evt.keyCode === 8){
        if (letterTurn > 0){
            currentGuessWord[letterTurn-1].innerText = ''
            letterTurn--
        } 
    }
}

function enterKeyPressed (evt) {
    if (evt.keyCode === 13){
        submitGuess()
    }
}

function submitGuess () {
    if (win === true) {
        return
    }
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
    updateHintButton ()
}

function compareArr (secretArr, guessArr) {
    let compareSecretArr = [...secretArr]
    guessArr.forEach(function (guessedLetter, idx){
        let secretIdx = compareSecretArr.findIndex(letter => letter === guessedLetter)
        if (compareSecretArr.includes(guessedLetter) && idx === secretIdx) {
            let color = 'rgb(133,192,249)'
            currentGuessWord[idx].style.backgroundColor = color 
            updateKeyboard (guessedLetter, color)
            spliceHintPool (guessedLetter)
            compareSecretArr[secretIdx] = 'null'
        } else if (compareSecretArr.includes(guessedLetter)){
            let color = 'rgb(245,121,57)'
            currentGuessWord[idx].style.backgroundColor = color
            updateKeyboard (guessedLetter, color)
            spliceHintPool(guessedLetter)
        } else {
            let color = 'rgb(58,58,59)'
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
            if (letter.style.backgroundColor !== 'rgb(133,192,249)'){
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
    difficulty = selectedDifficulty
}

function notARealWord (isItARealWord) {
    modal.classList.remove('modal-off')
    modal.classList.add('modal-on')
    modal.innerHTML = 
    `
        <p>Sorry</p>
        <h1>${isItARealWord.toUpperCase()}</h1>
        <p>is not a real word</p>
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
        <p>The word was</p>
        <h1>${secretArrWord.toUpperCase()}</h1>
        <p>You did it!</p>
        <button id="close-modal">Keep Playing!</button>
    `
    win = true
    updateStreakNumber('add')
    darkenSubmit ()
    darkenHint ()
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
        <p>The word was</p>
        <h1>${secretWord.toUpperCase()}</h1>
        <p>Better Luck Next Time!</p>
        <button id="close-modal">Try Again!</button>
    `
    updateStreakNumber('zero')
    darkenSubmit ()
    darkenHint ()
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
    if (guessNumber < 6){
        if (hintsAvailable === 0){
            return
        }
        if (hintPool.length === 0) {
            return
        }
        let hintGiven = hintPool[Math.floor(Math.random() * hintPool.length)]
        keyBoardLetters.forEach(function (letter){
            if (letter.id === hintGiven) {
                letter.style.backgroundColor = 'rgba(100, 2, 156, 0.8)'
            }
        })
        hintsAvailable--
        updateHintButton ()
    }
}

function updateHintButton () {
    if (hintPool.length === 0 || hintsAvailable === 0 || guessNumber === 6) {
        hintBtn.classList.remove('hints-available')
        hintBtn.classList.add('no-hints-available')
    } if (hintsAvailable === 1 && hintPool.length > 0 && guessNumber < 6) {
        hintBtn.classList.remove('no-hints-available')
        hintBtn.classList.add('hints-available')
    }
}

function darkenSubmit () {
    submitBtn.classList.remove('submit-ready')
    submitBtn.classList.add('submit-not-ready')
}

function submitReady () {
    submitBtn.classList.remove('submit-not-ready')
    submitBtn.classList.add('submit-ready')
}

function darkenHint () {
    hintBtn.classList.remove('hints-available')
    hintBtn.classList.add('no-hints-available')
}