import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, delay = 0, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, started]);

  return (
    <p className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
};
