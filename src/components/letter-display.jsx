import React, { useEffect, useState } from 'react';

// Array of bright colors for letters
const COLORS = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-orange-500',
  'text-teal-500',
  'text-cyan-500',
];

export default function LetterDisplay({ letters, currentWord }) {
  const [colorIndex, setColorIndex] = useState(0);

  // Change color every few seconds to make it fun
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % COLORS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get the last 10 letters to display
  const recentLetters = letters.slice(-10);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-8 px-4 bg-white rounded-2xl shadow-lg">
      {/* Current word being typed */}
      <div
        className={`text-8xl md:text-9xl font-bold ${COLORS[colorIndex]} transition-colors duration-500 min-h-[2em] flex items-center justify-center`}
      >
        {currentWord || '?'}
      </div>

      {/* Recent letters history */}
      <div className="flex flex-wrap justify-center gap-4 text-4xl">
        {recentLetters.map((letter, index) => {
          // Don't show special keys in history
          if (letter === 'Backspace' || letter === 'Enter') return null;

          // Replace space with visible symbol
          const displayLetter = letter === ' ' ? '␣' : letter;

          return (
            <span key={`${letter}-${Date.now()}-${Math.random()}`} className={`${COLORS[(index + colorIndex) % COLORS.length]} font-bold`}>
              {displayLetter}
            </span>
          );
        })}
      </div>
    </div>
  );
}
