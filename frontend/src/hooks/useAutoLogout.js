import { useEffect, useRef, useCallback} from "react";

export const useAutoLogout = ({ enabled, onLogout }) => {
  const timer = useRef(null);

  const resetTimer = useCallback(() => {
    const timeout = 1000*60*5;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onLogout, timeout);
  },[onLogout]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enabled, resetTimer]); 
};
