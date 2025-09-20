import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterTyping?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterTyping = 3000
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const previousTextRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousTextRef.current !== text) {
      setIsTyping(false); // Start deleting the old text
    }
    previousTextRef.current = text;
  }, [text]);

  useEffect(() => {
    let timeoutId: number;

    if (isTyping) {
      if (displayText.length < text.length) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Text fully typed, start deleting after a delay
        const randomDelay = delayAfterTyping + Math.random() * 2000;
        timeoutId = window.setTimeout(() => {
          setIsTyping(false);
        }, randomDelay);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Text fully deleted, start typing after a short delay
        timeoutId = window.setTimeout(() => {
          setIsTyping(true);
        }, 500);
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayText, isTyping, text, typingSpeed, deletingSpeed, delayAfterTyping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono text-xl md:text-2xl lg:text-3xl text-foreground">
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        |
      </span>
    </span>
  );
};

export default Typewriter;