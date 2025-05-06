'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [sampleText, setSampleText] = useState('');
  
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // Sample texts in different languages
  const sampleTexts = {
    english: "Welcome to the Text-to-Speech converter. This tool allows you to convert written text into natural-sounding speech. You can adjust the voice, rate, pitch, and volume to customize your experience.",
    spanish: "Bienvenido al conversor de texto a voz. Esta herramienta le permite convertir texto escrito en voz natural. Puede ajustar la voz, la velocidad, el tono y el volumen para personalizar su experiencia.",
    french: "Bienvenue dans le convertisseur de texte en parole. Cet outil vous permet de convertir du texte écrit en parole naturelle. Vous pouvez ajuster la voix, le débit, la hauteur et le volume pour personnaliser votre expérience.",
    german: "Willkommen beim Text-zu-Sprache-Konverter. Mit diesem Tool können Sie geschriebenen Text in natürlich klingende Sprache umwandeln. Sie können Stimme, Geschwindigkeit, Tonhöhe und Lautstärke anpassen, um Ihr Erlebnis anzupassen.",
    japanese: "テキスト読み上げコンバーターへようこそ。このツールを使用すると、書かれたテキストを自然な音声に変換できます。声、速度、ピッチ、音量を調整して、体験をカスタマイズできます。",
  };

  // Get available voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    
    // Function to load and set available voices
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      if (availableVoices.length > 0) {
        setAvailableVoices(availableVoices);
        setVoice(availableVoices[0].name); // Set default voice
      }
    };
    
    // Load voices
    loadVoices();
    
    // Chrome loads voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    // Stop speech synthesis when component unmounts
    return () => {
      if (utteranceRef.current) {
        synth.cancel();
      }
    };
  }, []);

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle voice change
  const handleVoiceChange = (e) => {
    setVoice(e.target.value);
  };

  // Handle rate change
  const handleRateChange = (e) => {
    setRate(parseFloat(e.target.value));
  };

  // Handle pitch change
  const handlePitchChange = (e) => {
    setPitch(parseFloat(e.target.value));
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  // Load sample text
  const loadSampleText = (language) => {
    setText(sampleTexts[language]);
    setSampleText(language);
  };

  // Play text-to-speech
  const speak = () => {
    const synth = window.speechSynthesis;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    if (text.trim() === '') return;
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Set selected voice
    const selectedVoice = availableVoices.find(v => v.name === voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Set speech parameters
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    // Set event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
      console.error('SpeechSynthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    // Start speaking
    synth.speak(utterance);
  };

  // Pause/resume speech
  const togglePause = () => {
    const synth = window.speechSynthesis;
    
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
  };

  // Stop speech
  const stopSpeech = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Record speech to audio file
  const generateAudio = async () => {
    if (text.trim() === '' || !window.MediaRecorder) {
      alert('Please enter some text or your browser does not support recording.');
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsGenerating(true);
    
    try {
      // Create audio context and nodes
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const destination = audioContext.createMediaStreamDestination();
      const audioElement = new Audio();
      audioElement.srcObject = destination.stream;
      
      // Set up media recorder
      const options = { mimeType: 'audio/webm' };
      const mediaRecorder = new MediaRecorder(destination.stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      // Handle data available event
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      // Handle recording stop event
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedChunks(chunks);
        
        // Create URL for the audio blob
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsGenerating(false);
      };
      
      // Start recording
      mediaRecorder.start();
      
      // Create oscillator and gain nodes (for capturing audio)
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(destination);
      
      // Start oscillator with 0 gain (silent)
      gainNode.gain.value = 0;
      oscillator.start();
      
      // Use speech synthesis to generate speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set selected voice
      const selectedVoice = availableVoices.find(v => v.name === voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set speech parameters
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      
      // Handle speech end
      utterance.onend = () => {
        // Stop recording after speech ends
        setTimeout(() => {
          mediaRecorder.stop();
          oscillator.stop();
        }, 500); // Add small delay to capture all audio
      };
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsGenerating(false);
      alert('There was an error generating the audio. Your browser may not support this feature.');
    }
  };

  // Download generated audio
  const downloadAudio = () => {
    if (recordedChunks.length === 0) return;
    
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'text-to-speech.webm';
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Group voices by language
  const groupedVoices = availableVoices.reduce((acc, voice) => {
    const lang = voice.lang || 'Unknown';
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(voice);
    return acc;
  }, {});

  // Sort languages alphabetically
  const sortedLanguages = Object.keys(groupedVoices).sort();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Text to Speech Converter
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Text to Convert
                </label>
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={8}
                  placeholder="Type or paste text here to convert to speech..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice
                  </label>
                  <select
                    value={voice}
                    onChange={handleVoiceChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortedLanguages.map(lang => (
                      <optgroup key={lang} label={`${lang}`}>
                        {groupedVoices[lang].map(voice => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sample Texts
                  </label>
                  <select
                    value={sampleText}
                    onChange={(e) => loadSampleText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select a sample</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Voice Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <label className="text-sm text-gray-600">Speed: {rate}x</label>
                      <span className="text-sm text-gray-500">(0.5 - 2)</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={rate}
                      onChange={handleRateChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <label className="text-sm text-gray-600">Pitch: {pitch}</label>
                      <span className="text-sm text-gray-500">(0.5 - 2)</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={pitch}
                      onChange={handlePitchChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <label className="text-sm text-gray-600">Volume: {volume}</label>
                      <span className="text-sm text-gray-500">(0 - 1)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {!isPlaying ? (
                  <button
                    onClick={speak}
                    disabled={text.trim() === '' || isGenerating}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span>Play</span>
                  </button>
                ) : (
                  <button
                    onClick={togglePause}
                    disabled={isGenerating}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    {isPaused ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        <span>Pause</span>
                      </>
                    )}
                  </button>
                )}
                
                {isPlaying && (
                  <button
                    onClick={stopSpeech}
                    disabled={isGenerating}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                    <span>Stop</span>
                  </button>
                )}
                
                <button
                  onClick={generateAudio}
                  disabled={text.trim() === '' || isGenerating || isPlaying}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      <span>Generate Audio</span>
                    </>
                  )}
                </button>
                
                {audioUrl && (
                  <button
                    onClick={downloadAudio}
                    className="bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Audio Preview</h2>
                
                {audioUrl ? (
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <audio
                      ref={audioRef}
                      controls
                      className="w-full"
                      src={audioUrl}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center text-center h-48">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-3"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                    <p className="text-gray-500">Generate audio to preview and download it here</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-md font-medium mb-3 text-blue-800">About Text to Speech Converter:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-2">
                  <li>Convert any text into natural-sounding speech</li>
                  <li>Choose from multiple voices in different languages</li>
                  <li>Adjust speech rate, pitch and volume</li>
                  <li>Generate and download audio files for offline use</li>
                  <li>Perfect for creating voiceovers, accessibility features, or language learning</li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-md font-medium mb-2 text-yellow-800">Notes:</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                  <li>Voice quality and available voices depend on your browser and operating system</li>
                  <li>Audio generation feature may not work in all browsers</li>
                  <li>For best results, use Chrome or Edge browsers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextToSpeech; 