import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({ end, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    const endVal = parseInt(end, 10);
    if (isNaN(endVal) || endVal <= 0) {
      setCount(end);
      return;
    }

    let start = 0;
    const totalSteps = endVal;
    const stepDuration = Math.max(Math.floor((duration * 1000) / totalSteps), 50);

    const timer = setInterval(() => {
      start += 1;
      if (start >= endVal) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref} className="font-tech font-extrabold">{count}{suffix}</span>;
}
