/* 
Game Function:
- player must guess a number between a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if they loose
- let player chose to play again 
*/

// Game values
let min = 1
let max = 10
let winningNum = 2
let guessesLeft = 3

// UI Elements
const game = document.getElementById('game')
const minNum = document.getElementById('min-num')
const maxNum = document.getElementById('max-num')
const guessBtn = document.getElementById('guess-btn')
const guessInput = document.getElementById('guess-input')
const message = document.getElementById('message')

// assign ui min and max
minNum.textContent = min
maxNum.textContent = max

// Send message function
const setMessage = (msg, color) => {
   message.style.color = color
   message.textContent = msg
}
// listen for guess 
guessBtn.addEventListener('click', () => {
   let guess = parseInt(guessInput.value)
   console.log(guess)
   if(isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter numbers between ${min} and ${max}`, 'red')
   }
   else {
      //Check if correct
      if(guess === winningNum) {
         // Disable input 
         guessInput.disabled = true
         guessInput.style.borderColor = 'green'
         setMessage(`You win! The number was ${winningNum}`, 'green')
      }
      else {
         guessInput.style.borderColor = 'red'
         setMessage(`${guess} was incorrect.  Please try again.`, 'red')
      }
   }
   
   guessInput.value = ""
})