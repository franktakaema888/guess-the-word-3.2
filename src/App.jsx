import logo from "/logo.png";
import "./App.css";
// import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  // const [currWord, setCurrentWord] = useState(getRandomWord());
  const [currWord, setCurrentWord] = useState('welcome'); // Hard coded word
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Add additional states below as required.

  // holds the current input value
  const [currentInput, setCurrentInput] = useState('');
  // track the number of guesses left 
  const [guessesLeft, setGuessesLeft] = useState(10);
  // track the game status - win, lose, inProgress
  const [gameStatus, setGameStatus] = useState('inProgress');

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // create additional function to power the
  const handleGuess = (event) => {
    event.preventDefault();

    // change input to lowercase and clear the input field
    const guess = currentInput.toLowerCase();
    setCurrentInput(''); // Clear input field
    // check if the letter has already been guessed. Inform the user that letter has been guessed.
    if (guessedLetters.includes(guess)) {
      // Inform user the letter has been guessed...

      return;
    }

    // add guessed letter to the the current guesses so far
    setGuessedLetters([...guessedLetters, guess]);

    // check if the guessed letter is in the word
    if (!currWord.includes(guess)) {
      // incorrect guess
      const newGuessesLeft = guessesLeft - 1;
      setGuessesLeft(newGuessesLeft);

      // check how many guesses user has
      if (newGuessesLeft <= 0) {
        setGameStatus('lost');
      }
    } else {
      // correct guess
      const updatedGuessedLetters = [...guessedLetters, guess]; // temp array
      // check if all the letters are correct
      const allLettersGuessed = currWord.split('').every(
        (letter) => updatedGuessedLetters.includes(letter)
      );
      // update the guessed letters
      setGuessedLetters(updatedGuessedLetters);
      
      if (allLettersGuessed) {
        setGameStatus('won');
      }
    }
  }

  // Function to reset the game
  const resetGame = () => {
    setCurrentWord('welcome');
    setGuessedLetters([]);
    setGuessesLeft(10);
    setGameStatus('inProgress');
    setCurrentInput('');
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        <h3>Guesses Left: {guessesLeft}</h3>
        {/* Insert form element here */}
        {gameStatus === 'inProgress' ? (
          <>
            <h3>Input</h3>
            <form onSubmit={handleGuess}>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                maxLength={1}
              />
              <button type="submit">Guess</button>
            </form>
          </>
        ) : (
          <>
            {gameStatus === 'won' && <h2>You won! 🎉</h2>}
            {gameStatus === 'lost' && <h2>You lost. The word was: {currWord}</h2>}
            <button onClick={resetGame}>Play Again</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
