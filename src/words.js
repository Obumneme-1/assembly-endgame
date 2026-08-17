export const WORDS = [
  "react",
  "javascript",
  "programming",
  "assembly",
  "developer",
  "frontend",
  "component",
  "computer",
  "algorithm",
  "database"
]

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    return WORDS[randomIndex]
}