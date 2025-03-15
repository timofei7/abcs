/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable array-element-newline */
import React, { useState, useEffect } from 'react';

// Fun prompts to encourage kids to type more
const PROMPTS = [
  'What letter comes after A?',
  'Try typing a color you like!',
  'Can you spell \'cat\'?',
  'Type any animal you know!',
  'What\'s your favorite food?',
  'Can you type the first letter of your name?',
  'Try typing the alphabet!',
  'Type a number you know!',
  'Can you spell \'dog\'?',
  'Type any fruit you like!',
  'What letter comes after A?',
  'Can you find the letter B on the keyboard?',
  'Try typing \'hello\'!',
  'What\'s your favorite toy? Try to spell it!',
  'What letter does Dada start with?',
  'What letter does Mama start with?',
  'What letter does Nonna start with?',
  'What letter does your brothers name start with?',
  'Type the first letter of your favorite color!',
];

// Words to recognize and respond to
const WORD_RESPONSES = {
  cat: 'Meow! That\'s a cat! 🐱',
  dog: 'Woof woof! Good job spelling dog! 🐶',
  hi: 'Hi there! 👋',
  hello: 'Hello to you too! 👋',
  abc: 'You know your ABCs! Great job! 🎉',
  red: 'Red like an apple! 🍎',
  blue: 'Blue like the sky! 🌈',
  green: 'Green like grass! 🌿',
  yellow: 'Yellow like the sun! ☀️',
  mom: 'Mom is special! ❤️',
  dad: 'Dad is awesome! 👨‍👧‍👦',
  v: 'that\'s a V for Vera!',
  c: 'that\'s a C for Cassian!',
  d: 'that\'s a D for Dada!',
  n: 'that\'s an N for Nonna!',
  b: 'that\'s a B for Buddy!',
  p: 'that\'s a P for Peppa!',
};

export default function AIPrompt({ letters, currentWord, selectedVoice, setCurrentWord }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  // Generate a new prompt
  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * PROMPTS.length);
    setPrompt(PROMPTS[randomIndex]);
  };

  // Initialize with a random prompt
  useEffect(() => {
    generatePrompt();
  }, []);

  // Check for word matches when current word changes
  useEffect(() => {
    let timer;
    // Convert current word to lowercase for matching
    const lowerWord = currentWord.toLowerCase();

    // Check if we have a specific response for this word
    if (WORD_RESPONSES[lowerWord]) {
      setResponse(WORD_RESPONSES[lowerWord]);
      setShowResponse(true);

      // Read the response aloud
      const utterance = new SpeechSynthesisUtterance(WORD_RESPONSES[lowerWord].replace(/[^\w\s]/gi, ''));
      utterance.rate = 0.9;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);

      // After showing response, generate a new prompt
      timer = setTimeout(() => {
        setShowResponse(false);
        generatePrompt();
        setCurrentWord('');
      }, 4000);
    }

    // If they've typed letters without a match, give them a new prompt
    if (lowerWord.length >= 6) {
      generatePrompt();
      setCurrentWord('');
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [currentWord, selectedVoice]);

  // Read the prompt aloud when it changes
  useEffect(() => {
    if (prompt && !showResponse) {
      const utterance = new SpeechSynthesisUtterance(prompt);
      utterance.rate = 0.9;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  }, [prompt, showResponse, selectedVoice]);

  return (
    <div className="w-full bg-yellow-100 rounded-xl p-6 shadow-md text-center">
      <div className="flex items-center justify-center">
        <span className="text-3xl mr-2">🤖</span>
        <h2 className="text-2xl font-bold text-purple-700">Vivi Friend</h2>
      </div>

      <div className="mt-4 min-h-[80px] flex items-center justify-center">
        {showResponse ? (
          <p className="text-2xl font-bold text-green-600 animate-bounce">{response}</p>
        ) : (
          <p className="text-2xl text-blue-600">{prompt}</p>
        )}
      </div>
    </div>
  );
}
