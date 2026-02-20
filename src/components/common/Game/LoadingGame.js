// components/LoadingGame.jsx
import React, { useState } from "react";

const words = ["react", "build", "docker", "node", "kubernetes", "prompt", "code", "mongo", "redux"];

const LoadingGame = () => {
  const [targetWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value === targetWord) {
      setResult("✅ Nice! You got it!");
      setTimeout(() => {
        const newWord = words[Math.floor(Math.random() * words.length)];
        setInput("");
        setResult("");
      }, 1500);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>⌛ Build-Time Word Challenge</h3>
      <p style={styles.instruction}>Type the word: <strong>{targetWord}</strong></p>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        style={styles.input}
        autoFocus
      />
      {result && <p style={styles.result}>{result}</p>}
    </div>
  );
};

const styles = {
  container: {
    background: "#222",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    textAlign: "center",
    width: "80%",
    maxWidth: "400px"
  },
  heading: {
    marginBottom: "10px",
    color: "#fff"
  },
  instruction: {
    color: "#ccc",
    marginBottom: "10px"
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #888",
    width: "80%"
  },
  result: {
    color: "lightgreen",
    marginTop: "10px"
  }
};

export default LoadingGame;
