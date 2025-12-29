import { useEffect, useRef, useCallback} from "react";

export const useAutoLogout = (onLogout) => {
  const timer = useRef(null);

  const resetTimer = useCallback(() => {
    const timeout = 1000*60*5;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onLogout, timeout);
  },[onLogout]);

  useEffect(() => {
    // Events to track user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    
    resetTimer(); // Start timer initially

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [resetTimer]); 
};
