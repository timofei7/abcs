/* eslint-disable react/button-has-type */
import React, { useCallback, useState, useEffect } from 'react';

import Keyboard from './components/keyboard';
import LetterDisplay from './components/letter-display';
import AIPrompt from './components/ai-prompt';
import VoiceSelector from './components/voice-selector';

export default function App() {
  const [letters, setLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [showEmojis, setShowEmojis] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Handle keyboard input
  const handleKeyPress = (key) => {
    // Add the letter to our display
    setLetters((prev) => [...prev, key]);

    // Update current word
    if (key === ' ' || key === 'Enter') {
      setCurrentWord('');
    } else if (key === 'Backspace') {
      setCurrentWord((prev) => prev.slice(0, -1));
    } else {
      setCurrentWord((prev) => prev + key);
    }

    // Play the sound for the letter
    // eslint-disable-next-line no-use-before-define
    playLetterSound(key);
  }

  // Play sound for letter
  const playLetterSound = (letter) => {
    if (letter === ' ' || letter === 'Enter' || letter === 'Backspace') return;

    const letterToSpeak = letter.toLowerCase();

    const utterance = new SpeechSynthesisUtterance(letterToSpeak)
    if (selectedVoice) {
      console.log(`on play letter ${selectedVoice.name}`);
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.75; // Slightly slower for kids
    window.speechSynthesis.speak(utterance);
  };

  // Clear all letters
  const clearLetters = () => {
    setLetters([]);
    setCurrentWord('');
  };

  // Toggle emoji keyboard
  const toggleEmojis = () => {
    setShowEmojis((prev) => !prev);
  };

  // Handle physical keyboard input
  const debouncedHandleKeyPress = useCallback(
    (() => {
      let timeoutId;
      return (key) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          handleKeyPress(key);
        }, 250);
      };
    })(),
    [selectedVoice],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === ' ') {
        debouncedHandleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVoice]);

  const handleVoiceChange = useCallback((voice) => {
    console.log(`voice change? ${voice?.name}`);
    setSelectedVoice(voice);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-b from-blue-100 to-purple-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-full flex justify-center space-x-2">
        {Array.from({ length: 100 }, (_, i) => (
          <span key={`top-${i}`} role="img" aria-label="emoji border">🎉</span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2">
        {Array.from({ length: 100 }, (_, i) => (
          <span key={`bottom-${i}`} role="img" aria-label="emoji border">🎉</span>
        ))}
      </div>

      <div className="absolute top-0 left-0 h-full flex flex-col justify-around">
        {Array.from({ length: 100 }, (_, i) => (
          <span key={`left-${i}`} role="img" aria-label="emoji border">🎉</span>
        ))}
      </div>
      {/* RIGHT border of emojis */}
      <div className="absolute top-0 right-0 h-full flex flex-col justify-around">
        {Array.from({ length: 100 }, (_, i) => (
          <span key={`right-${i}`} role="img" aria-label="emoji border">🎉</span>
        ))}
      </div>



      <div className="w-full max-w-5xl flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mt-4">HI VERA! Let's do letters!</h1>

        <LetterDisplay letters={letters} currentWord={currentWord} />

        <AIPrompt letters={letters} currentWord={currentWord} selectedVoice={selectedVoice} setCurrentWord={setCurrentWord} />

        <div className="flex gap-4 mb-4">
          <button
            onClick={clearLetters}
            className="px-6 py-3 bg-red-500 text-white rounded-full text-xl font-bold hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={toggleEmojis}
            className={`px-6 py-3 ${showEmojis ? 'bg-green-600' : 'bg-blue-500'} text-white rounded-full text-xl font-bold hover:opacity-90 transition-colors`}
          >
            {showEmojis ? 'ABC Keyboard' : 'Emoji Keyboard'}
          </button>
        </div>

        <Keyboard onKeyPress={handleKeyPress} showEmojis={showEmojis} />

        <VoiceSelector onVoiceChange={handleVoiceChange} />
      </div>
    </main>
  );
}
