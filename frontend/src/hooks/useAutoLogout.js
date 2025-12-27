import { useEffect, useRef } from "react";

export const useAutoLogout = (onLogout) => {
  const timeout = 1000*60*5;
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onLogout, timeout);
  };

  useEffect(() => {
    // Events to track user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    
    resetTimer(); // Start timer initially

    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [onLogout]); 
};
