import { useState } from 'react'
import { getRandomWord } from './words'
import './App.css'

export default function App() {

  const [guessedLetters, setGuessedLetters] = useState([])
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())

  const letters = currentWord.split("")
  const lettersToReturn = letters.map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter)
    return (
      <span key={index}>{isGuessed ? letter.toUpperCase() : ""}</span>
    )
  })

  const languages = [
      {name: "HTML", backgroundColor: "#E26d5c", color: "#f9f4f5"},
      {name: "CSS", backgroundColor: "#387D7A", color: "#f9f4f5"},
      {name: "JavaScript", backgroundColor: "#F4D03F", color: "#1E1E1E"},
      {name: "React", backgroundColor: "#2589BD", color: "#F9F4F5"},
      {name: "TypeScript", backgroundColor: "#297373", color: "#F9F4F5"},
      {name: "Node.js", backgroundColor: "#597081", color: "#F9F4F5"},
      {name: "Python", backgroundColor: "#E58F65", color: "#1E1E1E"},
      {name: "Assembly", backgroundColor: "#0D3B66", color: "#F9F4F5"},
  ]

  const wrongGuessCount = guessedLetters.filter(letter => 
    !currentWord.includes(letter)
  ).length
  const lang = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount
    return (
      <span key={language.name}
      className={isLanguageLost ? "lost" : ""}
      style={{ backgroundColor: language.backgroundColor, color: language.color, borderRadius: "5px", padding: "5px" }}>
        {language.name}
      </span>
    )
  })


  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
  const isGameWon = letters.every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount === languages.length
  const isGameOver = isGameWon || isGameLost
  const gameStatusClass = isGameWon ? "game-status game-won" : isGameLost ? "game-status game-lost" : "game-status"

  const keyboardElements = alphabet.map((letter) => {
    const isGuessed = guessedLetters.includes(letter)

    const isCorrect = isGuessed && currentWord.includes(letter)
    const isIncorrect = isGuessed && !currentWord.includes(letter)
    const className = isCorrect ? "correct" : isIncorrect ? "incorrect" : ""

    return (
      <button key={letter}
      className={className}
      disabled = {isGuessed || isGameOver}
      onClick={() => addGuessedLetter(letter)}>
        {letter.toUpperCase()}
      </button>
    )
  })



  function addGuessedLetter(letter) {
    setGuessedLetters((prev) => {
      return (
        prev.includes(letter) ? prev :
        [...prev, letter]
      )
    })
  }

  function resetGame() {
    setGuessedLetters([])
    setCurrentWord(getRandomWord())
  }
    return (
      <main>
        <h1>Assembly: Endgame</h1>
        <section className={gameStatusClass}>
          {isGameWon && <h2>You Win! 🎉 Well done!</h2>}
          {isGameLost && <h2>You Lose! 😢 The word was: {currentWord.toUpperCase()}</h2>}
        </section>
        <section className="languages-chips">
          {lang}
        </section>
        <section className="word-display">
          {lettersToReturn}
        </section>
        <section className="keyboard">
          {keyboardElements}
        </section>
        {isGameOver && (
          <button className="new-game" onClick={resetGame}>
            New Game
          </button>
        )}
      </main>
    )

}