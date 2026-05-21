import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate terminal log streams or typewriter typing.
 * @param {Array<string>} lines - Array of log strings to output sequentially
 * @param {number} baseDelay - Average delay between lines in milliseconds
 */
export function useTerminalEffect(lines, baseDelay = 150) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= lines.length) return;

    // Add slight random variation to delay to make it look realistic
    const randomDelay = baseDelay + (Math.random() - 0.5) * (baseDelay * 0.4);

    const timer = setTimeout(() => {
      setVisibleLines((prev) => [...prev, lines[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [currentIndex, lines, baseDelay]);

  const resetTerminal = () => {
    setVisibleLines([]);
    setCurrentIndex(0);
  };

  return { visibleLines, isComplete: currentIndex >= lines.length, resetTerminal };
}

/**
 * Custom hook for typewriter text effect
 * @param {Array<string>} words - Array of words to type cycle
 * @param {number} typeSpeed - Speed of character typing in ms
 * @param {number} deleteSpeed - Speed of character deleting in ms
 * @param {number} delayBetweenWords - Pause between words in ms
 */
export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, delayBetweenWords = 1500) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }, typeSpeed);

      // If finished typing, pause then start deleting
      if (currentText === currentWord) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      }, deleteSpeed);

      // If finished deleting, move to next word
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords]);

  return currentText;
}
