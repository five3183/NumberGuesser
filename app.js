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

//  Get the difference of the min and the max numbers and add 1 to account for all numbers in the range.  
let range = max - min + 1

// Set the winning number to a random number that is based off the range. Since math.random can be 0 we add min to make the minimum possible value incase random returns 0. 
let winningNum = Math.floor(Math.random()*(range) + min)
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

// Play again event listener:  Here we target the parent element to check if there is a className for play-again that was added after the paged loaded. Click cannot be used here, because as soon as the mouse is released it will trigger the reload.  We one this to happen on mouse down. 
game.addEventListener('mousedown', (e) => {
   if(e.target.className === 'play-again') {
      window.location.reload()
   }
})

// GAME OVER FUNCTION
const gameOver = (win, msg) => {
   let color
   win === true ? color = 'green' : color = 'red'
   // Disable input 
   guessInput.disabled = true
   guessInput.style.borderColor = color
   setMessage(msg, color)

   // Play again?  Here will will chance the inner text on the submit button to play again. And add a class to it so that we can reload the page on click.  
   guessBtn.value = 'Play Again'
   guessBtn.className += 'play-again'
}
// listen for guess 
guessBtn.addEventListener('click', () => {
   let guess = parseInt(guessInput.value)
   // console.log(guess)
   if(isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter numbers between ${min} and ${max}`, 'red')
   }
   else {
      //Check if correct
      if(guess === winningNum) {
        gameOver(true, `You win! The number was ${winningNum}`)
      }
      else {
         guessesLeft -= 1
         guessInput.style.borderColor = 'red'
         setMessage(`${guess} was incorrect.  Please try again. Please try again. You have ${guessesLeft} remaining`, 'red')
         if(guessesLeft === 0) {
            gameOver(false, `GAME OVER.  The correct number was ${winningNum}`)
         }
      }
   }
   
   guessInput.value = ""
})