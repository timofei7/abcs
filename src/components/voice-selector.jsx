/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

export default function VoiceSelector({ onVoiceChange }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const defaultVoice = availableVoices.find((voice) => voice.name === 'Noelle') || availableVoices[0];
      console.log(`default voice: ${defaultVoice?.name}`);
      setSelectedVoice(defaultVoice);
      onVoiceChange(defaultVoice);
    }

    loadVoices();

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [onVoiceChange]);

  const handleVoiceChange = (event) => {
    const voice = voices.find((v) => v.name === event.target.value);
    setSelectedVoice(voice);
    onVoiceChange(voice);
  };

  return (
    <div className="w-full max-w-md">
      <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-2">
        Choose a voice:
      </label>
      <select
        id="voice-select"
        value={selectedVoice?.name || ''}
        onChange={handleVoiceChange}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {`${voice.name} (${voice.lang})`}
          </option>
        ))}
      </select>
    </div>
  );
}
